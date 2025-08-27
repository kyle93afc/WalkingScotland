#!/usr/bin/env node
/**
 * Import remaining walks by processing them in smaller batches
 * and using file-based approach to avoid shell escaping
 */

const fs = require('fs');
const { execSync } = require('child_process');

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function importRemaining() {
    console.log('🔍 Finding walks that need to be imported...\n');

    const walksData = JSON.parse(fs.readFileSync('./converted_all_90_walks.json', 'utf8'));
    
    // Get current walks to see what's missing
    let currentWalks = [];
    try {
        const result = execSync('npx convex run walks:getPublishedWalks', { encoding: 'utf8', timeout: 10000 });
        currentWalks = JSON.parse(result.trim());
        console.log(`📊 Current walks in database: ${currentWalks.length}`);
    } catch (err) {
        console.log('Could not check current walks, proceeding anyway...');
    }

    const currentSlugs = new Set(currentWalks.map(w => w.slug));
    const missingWalks = walksData.filter(w => !currentSlugs.has(w.slug));
    
    console.log(`📋 Walks remaining to import: ${missingWalks.length}`);
    
    if (missingWalks.length === 0) {
        console.log('🎉 All walks already imported!');
        return;
    }

    console.log('\n📝 Sample missing walks:');
    missingWalks.slice(0, 5).forEach((w, i) => {
        console.log(`  ${i + 1}. ${w.title} (${w.regionSlug})`);
    });
    
    if (missingWalks.length > 5) {
        console.log(`  ... and ${missingWalks.length - 5} more`);
    }

    console.log('\n🚀 Starting import of remaining walks...');

    let imported = 0;
    let errors = 0;

    // Process in smaller batches
    const BATCH_SIZE = 5;
    
    for (let i = 0; i < missingWalks.length; i += BATCH_SIZE) {
        const batch = missingWalks.slice(i, i + BATCH_SIZE);
        console.log(`\n📦 Processing batch ${Math.floor(i/BATCH_SIZE) + 1}/${Math.ceil(missingWalks.length/BATCH_SIZE)}`);
        
        for (const walk of batch) {
            console.log(`  Importing: ${walk.title}`);
            
            // Create temp file with walk data
            const tempFile = `temp-walk-${Date.now()}-${Math.random().toString(36).substr(2, 9)}.json`;
            
            try {
                fs.writeFileSync(tempFile, JSON.stringify(walk, null, 2));
                
                // Use a much simpler command that just takes the filename
                const result = execSync(`node -e "
                    const fs = require('fs');
                    const { execSync } = require('child_process');
                    const walk = JSON.parse(fs.readFileSync('${tempFile}', 'utf8'));
                    const cmd = 'npx convex run seed:importSingleWalk';
                    const args = JSON.stringify({ walkData: JSON.stringify(walk) });
                    const result = execSync(cmd + ' \\'' + args + '\\'', { encoding: 'utf8' });
                    console.log(result);
                "`, {
                    encoding: 'utf8',
                    timeout: 30000
                });
                
                const response = JSON.parse(result.trim());
                
                if (response.created) {
                    imported++;
                    console.log(`    ✅ SUCCESS (${response.stageCount || 0} stages)`);
                } else {
                    errors++;
                    console.log(`    ❌ ${response.message || 'Unknown error'}`);
                }
                
            } catch (error) {
                errors++;
                console.log(`    ❌ FAILED: ${error.message.split('\n')[0]}`);
            } finally {
                // Cleanup
                try { fs.unlinkSync(tempFile); } catch (e) {}
            }
            
            await delay(1000);
        }
        
        // Pause between batches
        if (i + BATCH_SIZE < missingWalks.length) {
            console.log('  ⏸️  Pausing 3 seconds between batches...');
            await delay(3000);
        }
    }

    console.log(`\n🎉 Batch import complete!`);
    console.log(`✅ Successfully imported: ${imported}`);
    console.log(`❌ Errors: ${errors}`);
    console.log(`📊 Expected total in database: ${currentWalks.length + imported}`);
    
    // Final check
    try {
        const finalResult = execSync('npx convex run walks:getPublishedWalks', { encoding: 'utf8', timeout: 10000 });
        const finalWalks = JSON.parse(finalResult.trim());
        console.log(`🏁 Final count in database: ${finalWalks.length} walks`);
    } catch (err) {
        console.log('Could not get final count');
    }
}

importRemaining().catch(console.error);