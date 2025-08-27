#!/usr/bin/env node
/**
 * Direct import script for the 90 converted walks
 * This bypasses the need for the Convex dev server to update
 */

const fs = require('fs');
const { execSync } = require('child_process');

// Read the converted walks data
const walksData = JSON.parse(fs.readFileSync('./converted_all_90_walks.json', 'utf8'));

console.log(`🚀 Starting import of ${walksData.length} walks...`);

// Process walks in smaller batches to avoid timeouts
const BATCH_SIZE = 5;
let imported = 0;
let skipped = 0;
let errors = 0;

for (let i = 0; i < walksData.length; i += BATCH_SIZE) {
    const batch = walksData.slice(i, i + BATCH_SIZE);
    console.log(`\n📦 Processing batch ${Math.floor(i/BATCH_SIZE) + 1}/${Math.ceil(walksData.length/BATCH_SIZE)} (${batch.length} walks)`);
    
    for (const walk of batch) {
        try {
            console.log(`  Importing: ${walk.title}`);
            
            // Create the walk data as a JSON string for the CLI
            const walkJson = JSON.stringify(walk).replace(/"/g, '\\"');
            
            // Use npx convex run to call a simple import function
            // We'll need to create a simpler import function that takes walk data directly
            const result = execSync(`npx convex run seed:importSingleWalk '${walkJson}'`, {
                encoding: 'utf8',
                timeout: 30000 // 30 second timeout per walk
            });
            
            if (result.includes('"created":true')) {
                imported++;
                console.log(`    ✅ Imported successfully`);
            } else if (result.includes('"skipped":true')) {
                skipped++;
                console.log(`    ⏭️  Already exists, skipped`);
            }
            
        } catch (error) {
            errors++;
            console.log(`    ❌ Error: ${error.message.split('\n')[0]}`);
        }
    }
    
    // Small delay between batches
    if (i + BATCH_SIZE < walksData.length) {
        console.log('  Waiting 2 seconds...');
        await new Promise(resolve => setTimeout(resolve, 2000));
    }
}

console.log(`\n🎉 Import complete!`);
console.log(`✅ Imported: ${imported}`);
console.log(`⏭️  Skipped: ${skipped}`);
console.log(`❌ Errors: ${errors}`);
console.log(`📊 Total processed: ${imported + skipped + errors}/${walksData.length}`);