import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export const POST = async (req: NextRequest) => {
  try {
    const formData = await req.formData(); // Retrieve the form data
    const file = formData.get('file'); // Retrieve the file from form data
    const folder = formData.get('folder')?.toString() || 'default'; // Default folder if none is provided

    if (!file || !(file instanceof Blob)) {
      return NextResponse.json({ error: 'No file uploaded or invalid file type' }, { status: 400 });
    }

    // Prepare the file as a stream (convert the file into a buffer)
    const buffer = await file.arrayBuffer();

    // Set the file name and the path to save it
    const fileName = `${Date.now()}-${file.name}`;
    // const uploadPath = path.join(process.cwd(), folder, fileName); for localhost
    const uploadPath = path.join('/home/pakwachfm/uploads/', folder, fileName);

    // Ensure the folder exists
    const folderPath = path.dirname(uploadPath);
    if (!fs.existsSync(folderPath)) {
      fs.mkdirSync(folderPath, { recursive: true });
    }

    // Write the file to disk
    fs.writeFileSync(uploadPath, Buffer.from(buffer));
    console.log(`File written to: ${uploadPath}`);

    // The file URL that will be accessible via your subdomain
    const fileUrl = `https://uploads.pakwachfm.com/${folder}/${fileName}`;

    // Return the file URL in the response
    console.log(fileUrl)
    return NextResponse.json({ fileUrl }, { status: 200 });

  } catch (error) {
    console.error('Error uploading file:', error);
    return NextResponse.json({ error: 'An error occurred during the upload' }, { status: 500 });
  }
};
