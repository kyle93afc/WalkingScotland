#!/usr/bin/env node
/**
 * Diagnose import issues and show current database state
 */

const fs = require('fs');
const { execSync } = require('child_process');

async function diagnoseImports() {
    console.log('🔍 Diagnosing import status...\n');

    // Read the walks data
    const walksData = JSON.parse(fs.readFileSync('./converted_all_90_walks.json', 'utf8'));
    
    // Get current walks in database
    console.log('📊 Checking current database state...');
    try {
        const result = execSync('npx convex run walks:getPublishedWalks', {
            encoding: 'utf8',
            timeout: 10000
        });
        
        const currentWalks = JSON.parse(result.trim());
        console.log(`✅ Current walks in database: ${currentWalks.length}`);
        
        // Show some examples
        if (currentWalks.length > 0) {
            console.log('\n📝 Sample walks currently in database:');
            currentWalks.slice(0, 5).forEach((walk, i) => {
                console.log(`  ${i + 1}. ${walk.title} (${walk.region?.name || 'No Region'})`);
            });
            
            if (currentWalks.length > 5) {
                console.log(`  ... and ${currentWalks.length - 5} more`);
            }
        }
        
    } catch (error) {
        console.log(`❌ Error getting current walks: ${error.message.split('\n')[0]}`);
    }

    // Test a single walk import to see what errors occur
    console.log('\n🧪 Testing single walk import...');
    
    // Find a walk that might not exist yet
    const testWalk = walksData[10]; // Pick the 11th walk
    console.log(`Testing import of: ${testWalk.title}`);
    
    try {
        const walkJson = JSON.stringify(JSON.stringify(testWalk));
        const result = execSync(`npx convex run seed:importSingleWalk '{"walkData":${walkJson}}'`, {
            encoding: 'utf8',
            timeout: 15000
        });
        
        const response = JSON.parse(result.trim());
        console.log('✅ Test result:', response);
        
        if (response.error) {
            console.log('❌ Found error in test import:', response.message);
        }
        
    } catch (error) {
        console.log('❌ Test import failed:', error.message.split('\n')[0]);
        
        // Show more details
        if (error.stdout) {
            console.log('📄 Error details:', error.stdout.toString().slice(0, 500));
        }
    }

    // Check regions
    console.log('\n🌍 Checking available regions...');
    try {
        const result = execSync('npx convex run seed:seedRegions', {
            encoding: 'utf8',
            timeout: 10000
        });
        
        const regions = JSON.parse(result.trim());
        console.log(`✅ Available regions: ${Object.keys(regions).length}`);
        console.log('🗺️ Region slugs:', Object.keys(regions).slice(0, 10).join(', '));
        
    } catch (error) {
        console.log(`❌ Error checking regions: ${error.message.split('\n')[0]}`);
    }

    console.log('\n📋 Summary:');
    console.log(`- Total walks to import: ${walksData.length}`);
    console.log('- Check the errors above to understand what went wrong');
    console.log('- Common issues: missing regions, invalid data format, network timeouts');
}

diagnoseImports().catch(console.error);