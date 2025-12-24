const book = {
  title: "Genuis ",
  author: "Ahmad Toffaha ",
  year: 2008
};

console.log("Before:", book);

book.pages = 464;
console.log("After adding pages:", book);

delete book.year;
console.log("After deleting year:", book);
