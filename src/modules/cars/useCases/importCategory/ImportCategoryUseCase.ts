import csvParse from "csv-parse";
import fs from "fs";

import { ICategoriesRepository } from "../../repositories/ICategoriesRepository";

class ImportCategoryUseCase {
    constructor(private categoriesRepository: ICategoriesRepository) {}
    execute(file: Express.Multer.File): void {
        const stream = fs.createReadStream(file.path);

        const parseFile = csvParse.parse();

        stream.pipe(parseFile);

        parseFile.on("data", async line => {
            console.log(line);
        });

        console.log(file);
    }
}

export { ImportCategoryUseCase };
