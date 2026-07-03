PUT YOUR IMAGES IN THIS FOLDER
================================

PROFILE PHOTOS
--------------
images/profile-photo.jpg          → shown on the Home page, next to your name
                                     Recommended size: 400×400px (square), JPG/PNG/WebP

images/profile-photo-about.jpg    → shown on the About page, in the right-hand panel
                                     Recommended size: 800×1000px (portrait, 4:5 ratio)

PROJECT COVER IMAGES (Work page grid thumbnails)
---------------------------------
images/uncle-green-cover.jpg
images/doodling-cover.jpg
images/lunch-box-cover.jpg
images/editorial-posters-cover.jpg

Recommended size for all four: 1200×900px (landscape, 4:3 ratio), JPG or WebP,
ideally under 400KB each so the page loads quickly.

PROJECT MODAL IMAGES (full-screen view when you click Uncle Green, Doodling, or Lunch Box)
---------------------------------
Each project opens a full-screen view with its own scrollable/swipeable
strip — at least 4 images. Add files named like this (see the comment
block at the top of projects.js to add more or rename them):

  images/uncle-green-01.jpg   images/uncle-green-02.jpg   ...up to 04
  images/doodling-01.jpg      images/doodling-02.jpg      ...up to 04
  images/lunch-box-01.jpg     images/lunch-box-02.jpg     ...up to 04

Same size guidance as above: 1200×900px (4:3), JPG/WebP, under ~400KB each.

POSTERS GALLERY (posters.html — its own Pinterest-style page)
---------------------------------
images/posters-cover.jpg   → used in the small 4-up preview collage on
                              the Work page ("Print Galleries" section);
                              also reuses posters-01 through 04 below.
images/posters-01.jpg  images/posters-02.jpg  images/posters-03.jpg ...

Add as many as you like — edit the `galleryImages` array near the bottom
of posters.html. The grid shows 8 at a time with a "Load More" button.
Recommended: portrait mockups, ~1000×1300px, JPG/WebP.
Clicking any image opens a full-screen viewer with arrows, a counter,
and a "Back to Work" link.

BOOK COVERS GALLERY (book-covers.html — its own Pinterest-style page)
---------------------------------
Same pattern as Posters above, using:
  images/book-covers-01.jpg  images/book-covers-02.jpg  ...

Edit the `galleryImages` array near the bottom of book-covers.html to
add, remove, or reorder covers.

HOME PAGE CTA CARDS
---------------------------------
The two big "See My Work" / "Let's Talk" cards on the home page use
built-in icons (no image files needed) — nothing to add here.

HOW IT WORKS
------------
Until you add a real file with the exact name above, each spot will
automatically show a striped placeholder telling you what file is missing
and what size it expects. As soon as you drop in a correctly-named image,
it appears automatically — no code changes needed.

If you'd rather use your own filenames, just open the relevant HTML file
(for cover thumbnails) or projects.js (for modal carousel/gallery images)
and change the src="images/..." paths to match.
