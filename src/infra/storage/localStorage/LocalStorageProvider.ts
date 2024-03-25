import fs from 'fs'
import {resolve} from 'path'
import { avatarFolder, tmpFolder } from '../../../config/storage';

class LocalStorageProvider implements IStorageProvider {
  async save(file: string): Promise<void> {
    await fs.promises.rename(
      resolve(tmpFolder,file),
      resolve(avatarFolder,file)
    )
    
  }
  async delete(file: string): Promise<void> {
    const filePath = resolve(avatarFolder,  file)
    try {
      await fs.promises.stat(filePath)
    } catch {
      return 
    }
    await fs.promises.unlink(filePath)
  }
}


export {LocalStorageProvider}