#!/usr/bin/env node
/**
 * Import all 90 walks using the new importSingleWalk function
 */

const fs = require('fs');
const { execSync } = require('child_process');

// Function to create delay using Promise
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function importWalks() {
    // Read the converted walks data
    const walksData = JSON.parse(fs.readFileSync('./converted_all_90_walks.json', 'utf8'));

    console.log(`🚀 Starting import of ${walksData.length} walks...`);

    let imported = 0;
    let skipped = 0;
    let errors = 0;

    for (let i = 0; i < walksData.length; i++) {
        const walk = walksData[i];
        console.log(`\n[${i + 1}/${walksData.length}] Importing: ${walk.title}`);
        
        try {
            // Escape the JSON for shell command
            const walkJson = JSON.stringify(JSON.stringify(walk));
            
            // Use npx convex run to call the import function
            const result = execSync(`npx convex run seed:importSingleWalk '{"walkData":${walkJson}}'`, {
                encoding: 'utf8',
                timeout: 30000 // 30 second timeout per walk
            });
            
            const response = JSON.parse(result.trim());
            
            if (response.created) {
                imported++;
                console.log(`    ✅ SUCCESS: ${response.message}`);
            } else if (response.skipped) {
                skipped++;
                console.log(`    ⏭️  SKIPPED: ${response.message}`);
            } else {
                errors++;
                console.log(`    ❌ ERROR: ${response.message}`);
            }
            
        } catch (error) {
            errors++;
            console.log(`    ❌ FAILED: ${error.message.split('\n')[0]}`);
        }
        
        // Small delay to avoid overwhelming the server
        if (i < walksData.length - 1) {
            await delay(1000);
        }
    }

    console.log(`\n🎉 Import complete!`);
    console.log(`✅ Imported: ${imported} walks`);
    console.log(`⏭️  Skipped: ${skipped} walks`);
    console.log(`❌ Errors: ${errors} walks`);
    console.log(`📊 Total: ${imported + skipped + errors}/${walksData.length}`);

    if (imported > 0) {
        console.log(`\n🌟 Visit http://localhost:3000/walks to see your imported walks!`);
    }
}

// Run the import
importWalks().catch(console.error);