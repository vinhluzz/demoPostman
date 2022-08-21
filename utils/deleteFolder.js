const fs = require('fs');

if (!process.argv[2]) {
   process.exit();
}

fs.rm(process.argv[2], { recursive: true }, (err) => {
   if (err) {
      throw err;
   }
   console.log(`${process.argv[2]} is deleted!`);
})