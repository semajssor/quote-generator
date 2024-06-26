const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const twitterBtn = document.getElementById("twitter");
const newQuoteBtn = document.getElementById("new-quote");
const loader = document.getElementById("loader");

let apiQuotes = [];

function showLoadingSpinner() {
	loader.hidden = false;
	quoteContainer.hidden = true;
}

function removeLoadingSpinner() {
	loader.hidden = true;
	quoteContainer.hidden = false;
}

// Show new Quote
function newQuote() {
	showLoadingSpinner();
	// Pick a random quote from apiQuotes array
	const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
	// Chek if the author field is blank and replace it with 'unknown'
	if (!quote.author) {
		authorText.textContent = "- Unknown";
	} else {
		authorText.textContent = quote.author;
	}
	// Dynamically reduce font size for long quotes
	if (quote.text.length > 50) {
		quoteText.classList.add("long-quote");
	} else {
		quoteText.classList.remove("long-quote");
	}
	// Set quote, Hide Loader
	quoteText.textContent = quote.text;
	removeLoadingSpinner();
}

// Get Quotes From API
async function getQuotes() {
	const apiUrl = "https://jacintodesign.github.io/quotes-api/data/quotes.json";
	try {
		const response = await fetch(apiUrl);
		apiQuotes = await response.json();
		newQuote();
	} catch (error) {
		// Catch Error Here
		console.log(error);
	}
}

// To Tweet a quote
function tweetQuote() {
	const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
	window.open(twitterUrl, "_blank");
}

// Event Listeners
newQuoteBtn.addEventListener("click", newQuote);
twitterBtn.addEventListener("click", tweetQuote);

// On Load
getQuotes();

// Use this instead if local js file for quotes

// function newQuote() {
//    // Pick a random quote from js file
//    const quote = localQuotes[Math.floor(Math.random() * localQuotes.length)];
//    console.log(quote);
// }

// newQuote();
