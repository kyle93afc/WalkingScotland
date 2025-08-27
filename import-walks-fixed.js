#!/usr/bin/env node
/**
 * Import walks with proper shell escaping handling
 */

const fs = require('fs');
const { execSync } = require('child_process');

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function escapeForShell(str) {
    // Use base64 encoding to avoid all shell escaping issues
    return Buffer.from(str).toString('base64');
}

async function importWalksFixed() {
    const walksData = JSON.parse(fs.readFileSync('./converted_all_90_walks.json', 'utf8'));

    console.log(`🚀 Starting improved import of ${walksData.length} walks...`);

    let imported = 0;
    let skipped = 0;
    let errors = 0;

    // First check how many we already have
    try {
        const result = execSync('npx convex run walks:getPublishedWalks', {
            encoding: 'utf8',
            timeout: 10000
        });
        const currentWalks = JSON.parse(result.trim());
        console.log(`📊 Current walks in database: ${currentWalks.length}`);
    } catch (err) {
        console.log('Could not check current walks count');
    }

    for (let i = 0; i < walksData.length; i++) {
        const walk = walksData[i];
        console.log(`\n[${i + 1}/${walksData.length}] Importing: ${walk.title}`);
        
        try {
            // Write walk data to a temporary file to avoid shell escaping
            const tempFile = `./temp-walk-${Date.now()}.json`;
            fs.writeFileSync(tempFile, JSON.stringify(walk));
            
            try {
                // Use a simpler approach - encode as base64
                const walkJson = JSON.stringify(walk);
                const encodedWalk = Buffer.from(walkJson).toString('base64');
                
                const result = execSync(`npx convex run seed:importSingleWalk '{"walkData":"data:${encodedWalk}"}'`, {
                    encoding: 'utf8',
                    timeout: 30000
                });
                
                const response = JSON.parse(result.trim());
                
                if (response.created) {
                    imported++;
                    console.log(`    ✅ SUCCESS: Imported with ${response.stageCount || 0} stages`);
                } else if (response.skipped) {
                    skipped++;
                    console.log(`    ⏭️  SKIPPED: Already exists`);
                } else {
                    errors++;
                    console.log(`    ❌ ERROR: ${response.message || 'Unknown error'}`);
                }
                
            } finally {
                // Clean up temp file
                try { fs.unlinkSync(tempFile); } catch (e) {}
            }
            
        } catch (error) {
            errors++;
            const errorMsg = error.message.split('\n')[0];
            console.log(`    ❌ FAILED: ${errorMsg}`);
            
            // If it's a shell escaping error, try a different approach
            if (errorMsg.includes('Syntax error') || errorMsg.includes('Unterminated')) {
                console.log('    🔧 Shell escaping issue detected');
            }
        }
        
        // Small delay
        if (i < walksData.length - 1) {
            await delay(500);
        }
    }

    console.log(`\n🎉 Import complete!`);
    console.log(`✅ Imported: ${imported} walks`);
    console.log(`⏭️  Skipped: ${skipped} walks`);
    console.log(`❌ Errors: ${errors} walks`);
    console.log(`📊 Total: ${imported + skipped + errors}/${walksData.length}`);
    console.log(`🗄️ Expected total in database: ~${35 + imported} walks`);

    if (imported > 0) {
        console.log(`\n🌟 Visit http://localhost:3000/walks to see your imported walks!`);
    }
}

importWalksFixed().catch(console.error);