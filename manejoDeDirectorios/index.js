const { log } = require('console');
const fs = require('fs/promises')
const path = require('path')

async function main(){
    
    

    try {
        await fs.rename("test_folder", "renamedFolder")
        console.log("Folder renamed successfully");
    } catch (error) {
        console.error("Error rename folder: ", error);
    }

    // try {
    //     await fs.mkdir("parent_folder2")
    //     await fs.rename("renamedFolder", path.join("parent_folder", "renamed_folder"))
    //     console.log("Folder moved successfully");
    // } catch (error) {
    //     console.error("Error moving folder: ", error);
    // }

    async function copyFolder(src, dest){
        try {
            await fs.mkdir(dest)
            const files = await fs.readdir(src)
            for(const file of files){
                const srcPath = path.join(src, file)
                const desPath = path.join(dest, file)
                const stat = await fs.stat(srcPath)

                if(stat.isDirectory()){
                    await copyFolder(srcPath, desPath)
                } else {
                    await fs.copyFile(srcPath, desPath)
                }
            }
        } catch (error) {
            console.log("Error: ", error);
        }
    }


    try {
        await copyFolder("parent_folder", "copied_folder")
        console.log("un exito");
    } catch (error) {
        console.log("error");
    }
   
}

main()