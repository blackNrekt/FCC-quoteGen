import { useEffect, useState } from "react";
import COLORS_ARRAY from './colorsArray';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter } from '@fortawesome/free-brands-svg-icons';
import { faQuoteLeft } from '@fortawesome/free-solid-svg-icons';
import { faQuoteRight } from '@fortawesome/free-solid-svg-icons';
import BeatLoader from "react-spinners/BeatLoader";


function App() {

    const [quote, setQuote] = useState("");
    const [author, setAuthor] = useState("");
    const [accentColor, setAccentColor] = useState('#E64A19');
    const [quoteArray, setQuoteArray] = useState(null);
    

    const API_URL = "https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json";
    
    const backgroundStyle = {backgroundColor:accentColor};
    
    const genRandomQuote = () => {                
        let randomInt = Math.floor(quoteArray.length * Math.random());        
        setAccentColor(COLORS_ARRAY[randomInt]);
        setQuote(quoteArray[randomInt].quote);
        setAuthor(quoteArray[randomInt].author);        
    }

    useEffect (() => {
        const fetchQuotes = async (url)=>{
            const response = await fetch(url);
            const data = await response.json();            
            setQuoteArray(data.quotes);            
        }                
        fetchQuotes(API_URL);                
    }, [API_URL])

    useEffect(() => {
        if (quoteArray) {
            genRandomQuote();            
        } 
        // eslint-disable-next-line
    }, [quoteArray])

    return (
        <div className="App">
            <header className="App-header" style={backgroundStyle}>                
                    <div id="quote-box" style={{color:accentColor}}>
                        <p id="text"><FontAwesomeIcon icon={faQuoteLeft}/> {quote}<FontAwesomeIcon icon={faQuoteRight}/></p>
                        <p id="author">- {author}</p>   
                        <div className="buttons">
                            <a id="tweet-quote" style={backgroundStyle} 
                                href={encodeURI(`http://www.twitter.com/intent/tweet?text=${quote}`)}><FontAwesomeIcon icon={faTwitter}/></a>                    
                            <button id="new-quote" style={backgroundStyle} onClick={genRandomQuote}>Generate a Random Quote</button>                 
                        </div>                    
                    </div>
            </header>
        </div>
    )
}

export default App;
