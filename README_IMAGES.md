# How to Change the Images

To make it incredibly easy for you to customize this birthday application with your own pictures of Disha, all of the images have been moved to a separate static folder:

📂 **`/public/images/`**

### 🖼️ File Mapping
These are the files currently used in each scene:
1. **`photo1.jpg`** – Used as the first portrait in the "Photo Gallery" (Grace & Elegance).
2. **`photo2.jpg`** – Used as the second portrait in the "Photo Gallery" and also acts as the background constellation in the "Dream Sky" lantern scene.
3. **`photo3.jpg`** – Used as the third portrait in the "Photo Gallery" (Laughter & Friendship).
4. **`photo4.jpg`** – Used as the fourth portrait in the "Photo Gallery" (Charming & Playful).
5. **`photo5.jpg`** – Used as the fifth portrait in the "Photo Gallery" (Sacred Blessings).

---

### ✏️ How to Replace the Images
You can change any of these pictures directly without writing or changing a single line of code!

1. **Upload your new image** into the `/public/images/` folder using the file explorer in your editor workspace.
2. Make sure the file matches the exact name and format (e.g. **`photo1.jpg`**, **`photo2.jpg`**, etc. - use lowercase `.jpg`).
3. If your image is in another format like `.png` or `.webp`, you can rename it to `.jpg` or update the file paths inside `/src/images.ts`.

### 💡 Tips for Best Results:
- **Aspect Ratio**: Portrait style images (similar to standard phone photos, around 3:4 or 9:16 aspect ratios) fit best into the Polaroid cards and frames.
- **Background Constellation**: Since `photo2.jpg` is also used as a soft blended background constellation behind the floating lanterns in Scene 6, a photo with bright colors or a clean profile works beautifully there!
