/* PLEASE DON'T COPY THESE CODE*/

function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}
class App extends React.Component {
  constructor(props) {
    super(props);_defineProperty(this, "createBoard",
    () => {
      const cards = [];
      const cardImages = this.state.images.concat(this.state.images).sort(() => Math.random() - 0.5);
      for (let i = 1; i <= cardImages.length; i++) {
        const card = {
          id: i,
          isVisible: false,
          isMatched: false,
          isReset: false,
          image: cardImages[i - 1] };

        cards.push(card);
      }
      this.setState({ cards });
    });_defineProperty(this, "clearBoard",

    () => {
      this.setState({ cards: [], flippedCards: [], matchedCards: [], isClickDisabled: false, moveCount: 0 }, () => this.createBoard());
    });_defineProperty(this, "replay",

    () => {
      if (this.state.isModalOpen) this.setState({ isModalOpen: false });
      const cards = [...this.state.cards];
      cards.forEach(card => {
        card.isVisible = false;
        card.isReset = true;
      });
      this.setState({ cards });
      setTimeout(() => {
        this.clearBoard();
      }, 500);
    });_defineProperty(this, "handleCardClick",

    clickedCard => {
      // update flipped status
      const flippedCards = [...this.state.flippedCards];
      if (this.state.flippedCards.length < 2 && !this.state.isClickDisabled && !clickedCard.isVisible) {
        const cards = [...this.state.cards];
        cards.forEach(card => {
          if (card.id === clickedCard.id) {
            card.isVisible = !card.isVisible;
            flippedCards.push(card);
          }
        });
        this.setState({ cards, flippedCards }, () => {
          // max 2 cards flipped at once
          if (flippedCards.length === 2) {
            this.setState(state => ({ moveCount: state.moveCount + 1 }));
            this.setState({ isClickDisabled: true }, () => this.checkForMatch(flippedCards));
          }
        });
      }
    });_defineProperty(this, "checkForMatch",

    flippedCards => {
      if (flippedCards[0].image === flippedCards[1].image) {
        let matchedCards = [];
        flippedCards.forEach(card => card.isMatched = true);
        matchedCards = flippedCards.concat(this.state.matchedCards);

        // set isMatched to true for matched cards
        this.setState({ flippedCards: [], matchedCards, isClickDisabled: false }, () => {
          this.checkForWin();
        });
      } else {
        setTimeout(() => {
          this.setState({ flippedCards: [], isClickDisabled: false }, () => this.hideAllCards());
        }, 2000);
      }
    });_defineProperty(this, "hideAllCards",

    () => {
      const cards = [...this.state.cards];
      cards.map(card => !card.isMatched ? card.isVisible = false : card.isVisible = true);
      this.setState({ cards });
    });_defineProperty(this, "checkForWin",

    () => {
      if (this.state.matchedCards.length === this.state.cards.length) {
        setTimeout(() => {
          this.setState({ isModalOpen: true });
        }, 2000);
      }

    });this.state = { cards: [], flippedCards: [], matchedCards: [], moveCount: 0, isClickDisabled: false, isModalOpen: false, images: ["Hearts", "Star", "Mushrooms", "Donut", "Rainbow", "Balloons"] };}componentDidMount() {this.createBoard();}

  render() {
    return (
      React.createElement("div", null,
      React.createElement(Modal, { moveCount: this.state.moveCount, show: this.state.isModalOpen, onReplay: this.replay }),
      React.createElement("div", { className: "wrapper" },
      React.createElement("div", { className: "header" },
      React.createElement("div", { className: "move-count" }, "🎯 Moves: ", this.state.moveCount),
      React.createElement("button", { className: "new-game", onClick: this.replay }, "Rearrange Cards")),

      React.createElement("div", { className: "container" },
      this.state.cards.map((card, index) => {
        return (
          React.createElement(Card, { card: card, key: index, onCardClick: this.handleCardClick }));

      })))));




  }}




const Card = props => {
  let image;
  const cardImage = props.card.image;
  if (cardImage === 'Hearts') {
    image =
    React.createElement(Hearts, null);

  } else if (cardImage === 'Donut') {
    image =
    React.createElement(Donut, null);

  } else if (cardImage === 'Icecream') {
    image =
    React.createElement(Icecream, null);

  } else if (cardImage === 'Mushrooms') {
    image =
    React.createElement(Mushrooms, null);

  } else if (cardImage === 'Balloons') {
    image =
    React.createElement(Balloons, null);

  } else if (cardImage === 'Rainbow') {
    image =
    React.createElement(Rainbow, null);

  } else if (cardImage === 'Star') {
    image =
    React.createElement(Star, null);

  } else if (cardImage === 'Unicorn') {
    image =
    React.createElement(Unicorn, null);

  }

  const dotNumber = 100;
  let dots = [...Array(dotNumber)].map((e, i) => {
    return (
      React.createElement("div", { className: "dot", key: i }));

  });

  return (
    React.createElement("div", { className: `card-wrapper ${props.card.isReset ? "is-reset" : ""}`, onClick: () => props.onCardClick(props.card) },
    React.createElement("div", { className: `card-container ${props.card.isVisible ? "is-flipped" : ""}` },
    React.createElement("div", { className: "card card-back" }, React.createElement("div", { className: "dots" }, dots)),
    React.createElement("div", { className: `card card-front ${props.card.isMatched ? "is-matched" : ""}` },
    image))));




};

const Modal = props => {
  return (
    React.createElement("div", { id: "modal", className: props.show ? 'show' : '' },
    React.createElement("div", { className: "modal-box" },
    React.createElement("div", { className: "svg-box" },
    React.createElement("div", { className: "background-blur" }),
    React.createElement("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      xmlnsXlink: "http://www.w3.org/1999/xlink",
      viewBox: "0 0 377 303" },

    React.createElement("g", { style: { isolation: "isolate" } },
    React.createElement("g", { "data-name": "Layer 1" },

    React.createElement("g", null,
    React.createElement("path", {
      fill: "#453d84",
      stroke: "#453d84",
      strokeLinecap: "round",
      strokeLinejoin: "round",
      strokeWidth: "3",
      d: "M257.2 235.3l14.7-8.8a10.7 10.7 0 013.6-1.3l16.8-2.7-17.5 6.4z" }),

    React.createElement("path", {
      fill: "none",
      stroke: "#453d84",
      strokeLinecap: "round",
      strokeMiterlimit: "10",
      strokeWidth: "3",
      d: "M273.2 224.5L253.6 169.2" }),

    React.createElement("path", {
      fill: "none",
      stroke: "#453d84",
      strokeMiterlimit: "10",
      strokeWidth: "3",
      d: "M247.5 72.4l22.3 61.1a28 28 0 01-16.7 35.8c-14.4 5.3-30.6-2.2-36.8-16.3l-22.2-61.1c-1-2.9 11-7.2 25.7-12.5s26.7-9.9 27.7-7z" }),

    React.createElement("path", {
      fill: "#ffcbcb",
      d: "M252.1 165.5c-12.1 4.4-26.3-3.1-32.4-17.1l-14.9-40.9c7.6-1.4 13.8 2.7 23.2-6.5s15.3-6.3 22-10.1l15 41.1c5.1 14-.7 29-12.9 33.5z" }),

    React.createElement("path", {
      fill: "#ffcbcb",
      d: "M250 90.9l15 41.1c5.1 14-.7 29-12.9 33.5a22 22 0 01-15.6-.4 21.2 21.2 0 0010.1-1.1c12.2-4.5 18-19.5 12.9-33.5l-13.7-37.3z",
      style: { mixBlendMode: "multiply" } }),

    React.createElement("g", { fill: "#ffcbcb" },
    React.createElement("circle", {
      cx: "222.5",
      cy: "124.8",
      r: "3.4",
      transform: "rotate(-20 224.426 125.752)",
      style: { mixBlendMode: "multiply" } }),

    React.createElement("circle", {
      cx: "255.3",
      cy: "149.5",
      r: "3",
      transform: "rotate(-20.1 254.632 149.3)",
      style: { mixBlendMode: "multiply" } }),

    React.createElement("circle", {
      cx: "239.8",
      cy: "139.7",
      r: "2.7",
      transform: "rotate(-20.1 239.187 139.58)",
      style: { mixBlendMode: "multiply" } }),

    React.createElement("circle", {
      cx: "237.3",
      cy: "119.5",
      r: "1.7",
      transform: "rotate(-20.1 236.662 119.345)",
      style: { mixBlendMode: "multiply" } }),

    React.createElement("circle", {
      cx: "253.1",
      cy: "129.3",
      r: "2.5",
      transform: "rotate(-20.1 252.39 129.116)",
      style: { mixBlendMode: "multiply" } }),

    React.createElement("circle", {
      cx: "231.2",
      cy: "150.2",
      r: "2.8",
      transform: "rotate(-20.1 230.648 149.997)",
      style: { mixBlendMode: "multiply" } }))),



    React.createElement("g", { "data-name": "Glass" },
    React.createElement("path", {
      fill: "#453d84",
      stroke: "#453d84",
      strokeLinecap: "round",
      strokeLinejoin: "round",
      strokeWidth: "3",
      d: "M84.7 222.7l16.9 2.7a10.7 10.7 0 013.6 1.3l14.6 8.8-17.5-6.4z" }),

    React.createElement("path", {
      fill: "none",
      stroke: "#453d84",
      strokeLinecap: "round",
      strokeMiterlimit: "10",
      strokeWidth: "3",
      d: "M103.9 224.8L124.5 169.9" }),

    React.createElement("path", {
      fill: "none",
      stroke: "#453d84",
      strokeMiterlimit: "10",
      strokeWidth: "3",
      d: "M182.3 91.9L160 153a28 28 0 01-35.8 16.7c-14.4-5.3-21.9-21.4-17.6-36.2l22.3-61.1c1-2.9 13 1.6 27.7 7s26.7 9.6 25.7 12.5z" }),

    React.createElement("path", {
      fill: "#ffcbcb",
      d: "M125.8 166.1c-12.1-4.4-18.2-19.1-13.9-33.5l14.7-40.2c6.7 3.8 8.9 10.9 21.9 10s15.7 5.1 23.4 6.5l-14.7 40.4c-5.1 13.7-19.2 21.2-31.4 16.8z" }),

    React.createElement("path", {
      fill: "#ffcbcb",
      d: "M171.8 108.8l-14.7 40.4c-5 13.8-19.1 21.3-31.3 16.9a22.2 22.2 0 01-11.7-10.2 21.5 21.5 0 008.4 5.6c12.2 4.5 26.3-3.1 31.3-16.9l13.4-36.8z",
      style: { mixBlendMode: "multiply" } }),

    React.createElement("g", { fill: "#ffcbcb" },
    React.createElement("circle", {
      cx: "129.1",
      cy: "120.9",
      r: "3.4",
      transform: "rotate(-70 128.965 120.844)",
      style: { mixBlendMode: "multiply" } }),

    React.createElement("circle", {
      cx: "138.3",
      cy: "154.2",
      r: "3",
      transform: "rotate(-70 138.094 154.16)",
      style: { mixBlendMode: "multiply" } }),

    React.createElement("circle", {
      cx: "132.7",
      cy: "136.4",
      r: "2.7",
      transform: "rotate(-70 132.576 136.356)",
      style: { mixBlendMode: "multiply" } }),

    React.createElement("circle", {
      cx: "150.2",
      cy: "121.5",
      r: "1.7",
      transform: "rotate(-70 150.11 121.497)",
      style: { mixBlendMode: "multiply" } }),

    React.createElement("circle", {
      cx: "149.6",
      cy: "144",
      r: "2.5",
      transform: "rotate(-70 149.45 144.02)",
      style: { mixBlendMode: "multiply" } }),

    React.createElement("circle", {
      cx: "119.4",
      cy: "145.9",
      r: "2.8",
      transform: "rotate(-70 119.299 145.895)",
      style: { mixBlendMode: "multiply" } }))),



    React.createElement("path", {
      fill: "none",
      stroke: "#453d84",
      strokeLinecap: "round",
      strokeMiterlimit: "10",
      strokeWidth: "3",
      d: "M187.5 74L187.5 60.4" }),

    React.createElement("path", {
      fill: "none",
      stroke: "#453d84",
      strokeLinecap: "round",
      strokeMiterlimit: "10",
      strokeWidth: "3",
      d: "M179.5 77L169.8 67.4" }),

    React.createElement("path", {
      fill: "none",
      stroke: "#453d84",
      strokeLinecap: "round",
      strokeMiterlimit: "10",
      strokeWidth: "3",
      d: "M195.6 77L205.3 67.4" }),

    React.createElement("circle", { cx: "186.6", cy: "40.5", r: "0.8", fill: "#453d84" }),
    React.createElement("circle", {
      cx: "216.8",
      cy: "50.1",
      r: "1.1",
      fill: "#453d84",
      transform: "rotate(-20.1 216.364 49.985)" }),

    React.createElement("circle", { cx: "198.6", cy: "51.3", r: "0.8", fill: "#453d84" }),
    React.createElement("circle", { cx: "218.1", cy: "63.9", r: "1", fill: "#453d84" }),
    React.createElement("circle", { cx: "210.7", cy: "38.4", r: "0.8", fill: "#453d84" }),
    React.createElement("circle", { cx: "158.2", cy: "65.8", r: "0.8", fill: "#453d84" }),
    React.createElement("circle", { cx: "172.6", cy: "55.4", r: "0.8", fill: "#453d84" }),
    React.createElement("circle", {
      cx: "163.3",
      cy: "45.6",
      r: "1.1",
      fill: "#453d84",
      transform: "rotate(-67.5 163.246 45.65)" }),

    React.createElement("circle", { cx: "142.1", cy: "57", r: "0.9", fill: "#453d84" }),
    React.createElement("circle", { cx: "238.6", cy: "50.4", r: "0.8", fill: "#453d84" }))))),






    React.createElement("h1", null, "🎉 Congratulations! 🎊"),
    React.createElement("h2", { className: "result" }, "🏆 Your moves: ", React.createElement("span", null, props.moveCount)),
    React.createElement("button", { className: "new-game", onClick: props.onReplay }, "Next Level"))));

};

function Icecream() {
  return (
    React.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 259 259.7" },
    React.createElement("g", { style: { isolation: "isolate" } },
    React.createElement("g", { "data-name": "Layer 1" },
    React.createElement("g", null,
    React.createElement("path", {
      fill: "#ffe7cd",
      d: "M18.3 258.2a13.9 13.9 0 01-9.9-4.2l-2.8-2.8a14.1 14.1 0 010-19.9l57.5-57.5.2-.2.5-.5 1.2-.9.9 1.2a63.1 63.1 0 005.5 6.3l8.4 8.4a63.1 63.1 0 006.3 5.5l1.2.9-.9 1.2-.5.5-.2.2L28.3 254a13.9 13.9 0 01-10 4.2z" }),

    React.createElement("path", {
      fill: "#453d84",
      d: "M64.8 174.4a64.4 64.4 0 005.6 6.4l8.4 8.4a64.3 64.3 0 006.4 5.6l-.4.4L27.2 253a12.6 12.6 0 01-17.8 0l-2.8-2.8a12.6 12.6 0 010-17.8l57.5-57.5h.1l.4-.4m.5-4.2l-2.2 1.7-.6.6-.2.2-57.6 57.5a15.6 15.6 0 000 22l2.8 2.8a15.6 15.6 0 0022 0l57.5-57.5.2-.2.6-.6 1.9-2.4-2.4-1.8a61.7 61.7 0 01-6.1-5.4l-8.4-8.4a61.7 61.7 0 01-5.4-6.1l-1.8-2.4z" }),

    React.createElement("path", {
      fill: "#fbf6db",
      d: "M125.6 234.2a9.4 9.4 0 01-6.7-2.8l-36.2-36.1h.1l-2.4-2.4-2.5-2.5-8.4-8.4-2.5-2.5-2.4-2.4h-.2l-36.2-36.3a9.5 9.5 0 010-13.4l40.9-41 .2-.2 64.4-64.4a67.9 67.9 0 0194.9.1l.4.4 8.7 8.7a67.8 67.8 0 01-.3 95.4L132.3 231.5a9.4 9.4 0 01-6.7 2.7z" }),

    React.createElement("path", {
      fill: "#453d84",
      d: "M181.1 4a66 66 0 0146.5 19l.3.3 8.7 8.7a66.4 66.4 0 01-.3 93.3l-63.9 63.9-41.1 41.1a8 8 0 01-11.3 0l-35.1-35c.1-.1-4-4-6.1-6.1l-8.4-8.4c-2-2-5.8-6.1-6-6.1l-35.1-35a8 8 0 010-11.3l41-41 .2-.2 63.9-63.9.4-.4A66 66 0 01181.1 4m0-3a68.7 68.7 0 00-48.5 19.7l-.4.4-63.9 64-.3.3-40.9 40.9a11 11 0 000 15.6L62.2 177l2.3 2.3 1.2 1.3 2.5 2.6 8.4 8.4 2.6 2.5 1.3 1.3 2.2 2.2 35.1 35.1a11 11 0 0015.6 0l41.1-41.1 63.9-63.9a69.3 69.3 0 00.3-97.5l-8.7-9-.4-.4A68.7 68.7 0 00181.1 1z" }),

    React.createElement("path", {
      fill: "#fbf6db",
      d: "M71.7 108.1s-33.7 35.5-36 37.6l-6.7-6.5c-2.8-2.8-3.2-6.8-.4-9.6l49-49.6 12.6 9z", style: { mixBlendMode: "overlay" } }),

    React.createElement("path", {
      fill: "#fbf6db",
      d: "M236.8 125.2L131.7 230.3a8 8 0 01-11.3 0l-9.1-9.1a8 8 0 007.6-2.1l105-105.1a66.4 66.4 0 00.3-93.3l-5.3-5.3a66 66 0 019 7.5l.3.3 8.7 8.7a66.4 66.4 0 01-.1 93.3z",
      style: { mixBlendMode: "multiply" } }),

    React.createElement("path", {
      fill: "#ffcdff",
      d: "M191.7 183.3a18.1 18.1 0 01-10.3-3.2 18.3 18.3 0 01-7.9-15.1v-60.4a14.2 14.2 0 00-14.2-14.2h-1.8a14 14 0 00-14 14v23.9a14.6 14.6 0 01-14.5 14.5h-1.5a14.6 14.6 0 01-14.5-14.5V97.2a6.7 6.7 0 00-6.7-6.7H84.2a8.1 8.1 0 01-5.7-13.8l59.2-59.2c10.3-10.3 24.7-16 40.5-16 19.9 0 40.1 8.8 55.4 24.1 13.8 13.8 22.3 31.4 23.8 49.5.1 1.5.2 3.5.1 6.1a9.5 9.5 0 01-9.4 9.3h-31.6A6.5 6.5 0 00210 97v67.5c0 9.8-7.3 18.1-16.7 18.8h-1.6z" }),

    React.createElement("path", {
      fill: "#453d84",
      d: "M178.1 3c18.7 0 38.7 8.1 54.4 23.7 14 14 21.9 31.6 23.4 48.6.1 1.6.2 3.8.1 5.9a7.9 7.9 0 01-7.9 7.8h-31.6a8 8 0 00-8 8v67.5c0 8.8-6.6 16.6-15.4 17.4h-1.4a16.6 16.6 0 01-9.5-3 16.8 16.8 0 01-7.3-13.8v-60.5A15.7 15.7 0 00159.2 89h-1.8a15.5 15.5 0 00-15.5 15.5v23.9a13.1 13.1 0 01-13 13h-1.5a13.1 13.1 0 01-13-13V97.2a8.3 8.3 0 00-8.2-8.2h-22a6.6 6.6 0 01-4.7-11.3l59.2-59.2C149.1 8.1 163.2 3 178.1 3m0-3c-16.2 0-31 5.8-41.5 16.4L77.4 75.6A9.6 9.6 0 0084.2 92h21.9a5.2 5.2 0 015.2 5.2v31.1a16.1 16.1 0 0016 16h1.5a16.1 16.1 0 0016-16v-23.9A12.5 12.5 0 01157.4 92h1.8a12.7 12.7 0 0112.7 12.7V165a19.8 19.8 0 008.6 16.3 19.6 19.6 0 0011.2 3.5h1.7c10.2-.8 18.1-9.8 18.1-20.3V97a5 5 0 015-5h31.6A11 11 0 00259 81.2a61.9 61.9 0 00-.1-6.2c-1.6-18.4-10.2-36.4-24.3-50.4C219 8.9 198.4 0 178.1 0z" }),

    React.createElement("path", {
      fill: "#ffe7cd",
      d: "M85.3 194.9l-.4.4h-.1L27.2 253a12.6 12.6 0 01-17.8 0l-2.8-2.8a12.2 12.2 0 01-1.5-1.8 12.6 12.6 0 0016-1.5l57.5-57.5h.1a64.3 64.3 0 006.6 5.5z",
      style: { mixBlendMode: "multiply" } }),

    React.createElement("path", {
      fill: "#ffcdff",
      d: "M255.6 81.1a7.9 7.9 0 01-7.9 7.8h-31.6a8 8 0 00-8 8v67.5c0 8.8-6.6 16.6-15.4 17.4a16.5 16.5 0 01-10.9-2.9 16.9 16.9 0 01-6.6-9.1 16.7 16.7 0 008.7 1.6c8.8-.7 15.4-8.5 15.4-17.4V86.6a8 8 0 018-8h31.6a7.9 7.9 0 007.9-7.8 57.2 57.2 0 00-.1-5.9A77.2 77.2 0 00232 26.6h.1c14 14 21.9 31.6 23.4 48.6.2 1.7.2 3.8.1 5.9zM165.8 90.3a15.7 15.7 0 00-6.3-1.3h-1.8a15.5 15.5 0 00-15.5 15.5v23.9a13.1 13.1 0 01-13 13h-1.5a13.1 13.1 0 01-12.9-11 13 13 0 004 .6h1.5a13.1 13.1 0 0013-13V94.1a15.5 15.5 0 0115.5-15.5h1.8a15.7 15.7 0 0115.2 11.7z",
      style: { mixBlendMode: "multiply" } }),

    React.createElement("g", { style: { mixBlendMode: "overlay" } },
    React.createElement("path", {
      fill: "#ffcdff",
      d: "M229 23.4C202.6 7.2 170.3 8 150.8 27.5L91.6 86.7a6.7 6.7 0 00-1.4 2.3h-6a6.6 6.6 0 01-4.7-11.3l59.2-59.2c22.6-22.6 62.4-20.1 90.3 4.9z" })))))));







}

function Donut() {
  return (
    React.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 248.2 248.2" },
    React.createElement("g", { style: { isolation: "isolate" } },
    React.createElement("g", { "data-name": "Layer 1" },
    React.createElement("g", null,
    React.createElement("path", {
      fill: "#ffe7cd",
      stroke: "#453d84",
      strokeLinecap: "round",
      strokeLinejoin: "round",
      strokeWidth: "3",
      d: "M124.1 1.5a122.6 122.6 0 10122.6 122.6A122.6 122.6 0 00124.1 1.5zm-4.6 159.3a37 37 0 1137-37 37 37 0 01-37 37z" }),

    React.createElement("path", {
      fill: "#fccc9f",
      d: "M224.3 56.1A121.1 121.1 0 0115.6 177.7c19.1 39.9 61.1 67.5 108.7 67.5a120.8 120.8 0 00120.8-120.9c0-25.1-7.2-49.4-20.8-68.2z" }),

    React.createElement("path", {
      fill: "#ffcdff",
      d: "M144.5 235.3c-6.4 0-14.9-5.1-23-9.9-5.8-3.4-11.2-6.7-15.3-7.8a20.6 20.6 0 00-5.3-.6 87.2 87.2 0 00-10.1.9 107.9 107.9 0 01-13.3 1.1c-8.4 0-15.1-1.8-21.2-5.7-17.5-11.3-18.9-25.3-20-36.6-.4-4.3-.8-8.4-2.1-11.7s-6.3-9.6-11.1-15.2c-8.3-9.5-17.7-20.3-16.5-31.3s10-21.2 17.7-29.5c4.4-4.7 8.6-9.1 11-13.6 1.3-2.4 1.9-6.1 2.5-10.3 1.5-10.3 3.6-24.3 20.3-32.4 9.5-4.6 18.9-4.8 28-5 11.1-.2 20.6-.4 28.4-8.3a27.4 27.4 0 0120.5-8.6c8.5 0 19.3 3 33.8 9.6 12.1 5.4 16.8 14.3 21 22.1s7.5 13.9 16.3 16.7c14.5 4.6 26.1 16.8 29.5 31.2 2.8 12.1-1.7 25.4-5.3 36.1a99.8 99.8 0 00-3.7 12.5c-.6 3 .2 6.2 1 10 1.7 7.6 3.8 17.1-3.2 31.2-6.2 12.5-19.3 15.7-29.8 18.3-5.4 1.3-10.4 2.6-13.6 4.8s-5.5 6.4-8.1 10.9c-5.5 9.4-12.4 21.2-28.4 21.2h-.1zM126.9 88.1a35.5 35.5 0 1015.8 3.7 35.4 35.4 0 00-15.8-3.7z" }),

    React.createElement("path", {
      fill: "#453d84",
      d: "M135.1 12.4c8.5 0 19.1 3.1 33.1 9.5 22.8 10.3 18.3 32.8 37.5 38.8a42.5 42.5 0 0128.4 30.1c3.9 16.7-6.8 35.9-9 47.9-1.8 9.7 8.2 20.2-2 40.8-9.1 18.2-33.1 15.6-42.9 22.5s-13 31.8-35.6 31.8h-.1c-10.5 0-27.8-15-38-17.7a22.2 22.2 0 00-5.7-.6c-6.7 0-14.8 1.9-23.4 1.9-6.7 0-13.7-1.2-20.4-5.5-23.6-15.2-16.8-35.3-21.5-47.6S6.2 135.2 8 118.6s21.6-29.8 28.7-42.5c5-9.1-.6-31 22.1-42.1 20.6-10 41.9 1.4 56.9-13.6a26 26 0 0119.5-8.1m-8.3 148.3a37 37 0 10-16.5-3.9 37 37 0 0016.5 3.9m8.2-151.2a28.8 28.8 0 00-21.6 9c-7.4 7.4-16.7 7.6-27.4 7.8-8.9.2-18.9.4-28.7 5.2C40 39.9 37.8 54.4 36.3 65c-.6 4.1-1.1 7.6-2.3 9.8-2.4 4.2-6.4 8.6-10.8 13.2-7.9 8.4-16.8 18-18.2 30.3s8.4 22.7 16.9 32.4c4.8 5.4 9.2 10.6 10.9 14.7s1.6 7.1 2 11.4c1.1 11.6 2.6 26 20.7 37.7 6.3 4.1 13.3 6 22 6a109.1 109.1 0 0013.4-1.1 86.2 86.2 0 019.9-.9 19.2 19.2 0 014.9.5c3.9 1 9.2 4.2 14.9 7.6 8.3 5 16.9 10.1 23.8 10.1h.2c16.8 0 23.9-12.2 29.7-21.9 2.6-4.4 5-8.5 7.7-10.4s7.9-3.3 13.1-4.6c10.8-2.6 24.2-5.9 30.8-19.1s5-24.7 3.3-32.2c-.8-3.6-1.5-6.7-1-9.4a98.8 98.8 0 013.7-12.3c3.7-10.9 8.3-24.4 5.3-36.9-3.5-14.9-15.5-27.6-30.5-32.3-8.2-2.6-11.6-8.8-15.4-15.9s-9.3-17-21.8-22.6c-14.7-6.6-25.6-9.7-34.4-9.7zm-8.3 148.3a34 34 0 1130.5-18.8 33.7 33.7 0 01-30.5 18.8z" }),

    React.createElement("path", {
      fill: "#ffcdff",
      d: "M168.3 22.4c-27.2-12.3-41.5-12.6-52.6-1.4-15 15-36.4 3.6-56.9 13.6-22.7 11.1-17.1 33-22.1 42.1C29.6 89.4 10 101.3 8 119.2c-.9 8.5 5.1 17.1 11.8 25.1a19 19 0 01-1.1-8.3c2-17.8 21.6-29.8 28.6-42.5 5-9.1-.5-31 22.1-42.1 20.6-10 41.9 1.4 56.9-13.6 11.2-11.2 25.5-10.9 52.6 1.3a35.2 35.2 0 0111.5 8.1c-4.8-8.6-8.8-18.8-22.1-24.8z", style: { mixBlendMode: "overlay" } }),

    React.createElement("path", {
      fill: "#ffcdff",
      d: "M223.2 179.5c-9.1 18.2-33.1 15.6-42.9 22.5s-13 31.9-35.8 31.8c-10.5 0-27.8-15-38-17.6-12-3.2-31.7 7.2-49.4-4.2-8.1-5.2-12.6-11-15.2-16.8a50.3 50.3 0 005.3 3.9c17.7 11.4 37.5 1 49.4 4.2 10.1 2.7 27.5 17.6 37.9 17.6 22.8.1 26-24.9 35.8-31.8s33.8-4.3 42.9-22.5c10.3-20.6.2-31 2-40.8 2.3-12 13-31.2 9-47.9a31.6 31.6 0 00-3.3-8.1c6.6 6.9 11.6 14.3 13.2 21 3.9 16.7-6.8 35.9-9 47.9-1.7 9.8 8.3 20.2-1.9 40.8z",
      style: { mixBlendMode: "multiply" } }),

    React.createElement("g", {
      fill: "none",
      strokeLinecap: "round",
      strokeMiterlimit: "10",
      strokeWidth: "7" },

    React.createElement("path", { stroke: "#ccd0ff", d: "M56.1 189.3L65.3 186" }),
    React.createElement("path", { stroke: "#cdffcc", d: "M60.7 166.4L60.7 146.2" }),
    React.createElement("path", { stroke: "#e8fecd", d: "M90 173.6L100.5 173.6" }),
    React.createElement("path", { stroke: "#cdffcc", d: "M35.9 138.4L23.6 132.6" }),
    React.createElement("path", { stroke: "#ccd0ff", d: "M47.3 125.4L54.8 109.7" }),
    React.createElement("path", { stroke: "#ffffcd", d: "M45.1 95.8L39.6 89" }),
    React.createElement("path", { stroke: "#cdffcc", d: "M70.5 85L79.9 76.9" }),
    React.createElement("path", { stroke: "#ffffcd", d: "M60.7 56.9L56.8 44.5" }),
    React.createElement("path", { stroke: "#ffffcd", d: "M68.5 125.4L75.2 129.3" }),
    React.createElement("path", { stroke: "#ffffcd", d: "M105 76.9L104.4 62.8" }),
    React.createElement("path", { stroke: "#ccd0ff", d: "M80.6 60.2L90 45" }),
    React.createElement("path", { stroke: "#cdffcc", d: "M109.6 34.6L116.2 37.8" }),
    React.createElement("path", { stroke: "#e8fecd", d: "M120.8 56.3L135.2 57.6" }),
    React.createElement("path", { stroke: "#cff", d: "M138.9 36.7L138.9 24.3" }),
    React.createElement("path", { stroke: "#ccd0ff", d: "M145.4 50.7L157.2 45.2" }),
    React.createElement("path", { stroke: "#ffffcd", d: "M157.8 24.3L165.4 33.2" }),
    React.createElement("path", { stroke: "#cff", d: "M138.9 76.9L151.3 81" }),
    React.createElement("path", { stroke: "#ffffcd", d: "M165.1 68.4L156 68.4" }),
    React.createElement("path", { stroke: "#cdffcc", d: "M178.4 53.9L179.6 66.9" }),
    React.createElement("path", { stroke: "#cff", d: "M192.4 76.9L205.3 76.9" }),
    React.createElement("path", { stroke: "#ccd0ff", d: "M173.3 106.8L183.4 120.8" }),
    React.createElement("path", { stroke: "#e8fecd", d: "M161.9 96L170.2 94.1" }),
    React.createElement("path", { stroke: "#cdffcc", d: "M226 112.5L211.9 100.9" }),
    React.createElement("path", { stroke: "#ffffcd", d: "M196.2 100.1L204.1 90" }),
    React.createElement("path", { stroke: "#cdffcc", d: "M112.9 193.8L112.9 202.3" }),
    React.createElement("path", { stroke: "#ccd0ff", d: "M136.9 186.2L155.8 174.4" }),
    React.createElement("path", { stroke: "#e8fecd", d: "M129.1 204.1L133.8 218.7" }),
    React.createElement("path", { stroke: "#cff", d: "M148.4 208.3L166.1 208.3" }),
    React.createElement("path", { stroke: "#ffffcd", d: "M80.6 205.4L86.5 193.8" }),
    React.createElement("path", { stroke: "#ffffcd", d: "M49.2 171.1L42.3 162.6" }),
    React.createElement("path", { stroke: "#ffffcd", d: "M85.3 159.1L90 156.3" }),
    React.createElement("path", { stroke: "#cff", d: "M79.2 100.1L83.6 95.1" }),
    React.createElement("path", { stroke: "#cff", d: "M33.8 116.8L23.6 108.2" }),
    React.createElement("path", { stroke: "#cff", d: "M172.6 143.9L167.8 156.7" }),
    React.createElement("path", { stroke: "#ffffcd", d: "M166.2 180.2L179.9 177.6" }),
    React.createElement("path", { stroke: "#cdffcc", d: "M197.7 155.5L187 144.8" }),
    React.createElement("path", { stroke: "#e8fecd", d: "M200 127.3L210.3 122.5" }),
    React.createElement("path", { stroke: "#ccd0ff", d: "M192.4 184L205.3 180.8" }),
    React.createElement("path", { stroke: "#ffffcd", d: "M210 165L215.8 153.2" }),
    React.createElement("path", { stroke: "#ffffcd", d: "M118.2 174.9L123.5 172.3" }),
    React.createElement("path", { stroke: "#cff", d: "M58.7 69.9L47.3 71.8" })))))));






}

function Hearts() {
  return (
    React.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 260.6 206.1" },
    React.createElement("g", { style: { isolation: "isolate" } },
    React.createElement("g", { "data-name": "Layer 1" },
    React.createElement("g", null,
    React.createElement("path", {
      fill: "#ccd0ff",
      d: "M169.5 128.7h-1.2c-3.4-.5-21.1-8.1-37.1-22.1s-31.8-34.4-29.9-64.3c1.5-22.5 19.9-40.8 41-40.8a37.5 37.5 0 017.2.7c17.7 3.5 28.6 15.1 32.4 34.6 6.1-12.4 18.4-24.1 36.9-24.1l4.9.3A38.2 38.2 0 01251 28.9a44.6 44.6 0 017 35.6c-11.6 53-76.2 64.2-88.5 64.2z" }),

    React.createElement("path", {
      fill: "#453d84",
      d: "M142.4 3a35.8 35.8 0 016.9.7c22.6 4.4 30 22 32 38.4 5.3-14.3 17.9-27.9 37.5-27.9l4.8.3c23.2 2.5 38.2 25.6 32.9 49.7-11.5 52.8-76.6 63-87 63h-1c-5.8-.8-69.3-28.9-65.7-84.8C104.3 20.3 122.1 3 142.4 3m0-3a41.1 41.1 0 00-28.9 12.3 46.2 46.2 0 00-13.7 29.9c-2 30.5 15.4 52.4 30.3 65.5s33.9 21.9 37.9 22.5h1.4c12.4 0 78.1-11.4 89.9-65.4a46.1 46.1 0 00-7.1-36.8 39.7 39.7 0 00-28.3-16.5l-5.1-.3a40.4 40.4 0 00-26.1 9.3 46.2 46.2 0 00-10.2 12.1 49 49 0 00-7.1-15.9c-5.9-8.5-14.5-13.8-25.6-16a39 39 0 00-7.5-.7z" }),

    React.createElement("path", {
      fill: "#ccd0ff",
      d: "M256.5 64.1c-10.6 55.7-88.1 65.9-88 63s65.4-17.2 76-65.6c4.5-20.5-5.7-40.4-23.2-47.3l2.3.2c23.2 2.5 37.5 25.5 32.9 49.7z",
      style: { mixBlendMode: "multiply" } }),

    React.createElement("path", {
      fill: "#ccd0ff",
      d: "M149.9 3.7c8.3 1.6 14.5 5 19.1 9.4a43.1 43.1 0 00-9.5-3c-22.9-4.5-44.8 14.1-46.4 38.7-2.1 32.5 18.6 55.7 37.4 69.4-20.4-12.3-49.6-37.6-47.1-75.9C105 17.8 126.9-.8 149.9 3.7z",
      style: { mixBlendMode: "soft-light" } }),

    React.createElement("g", null,
    React.createElement("path", {
      fill: "#ffcbcb",
      d: "M72.5 204.6c-15 0-51.4-3.4-66.5-35.1a35.5 35.5 0 01-.7-29.2 30.6 30.6 0 0118.6-17.4 34.1 34.1 0 0110.6-1.8c9.1 0 17.4 4.2 24.8 12.5-.4-11.9 4.6-25.4 19.9-31.9a30.2 30.2 0 0111.9-2.5c14.3 0 27.4 10.3 31.9 25 6.9 22.9-2.7 42.7-12 55.3s-22.7 22.8-25.3 23.8-6.7 1.3-13.2 1.3z" }),

    React.createElement("path", {
      fill: "#453d84",
      d: "M91.1 100.8c13.4 0 26.1 9.4 30.5 23.9 12.9 42.5-32.1 75.6-36.4 77.3-1.2.4-6 1.1-12.7 1.1-18.4 0-51.3-5.1-65.1-34.2-8.4-17.6-.5-38.8 17.1-44.5a32.5 32.5 0 0110.1-1.7c11.9 0 20.6 7.6 26.7 15.8-2-12.8 2.2-28.3 18.5-35.3a28.8 28.8 0 0111.4-2.3m0-3a31.7 31.7 0 00-12.5 2.6c-14.3 6.1-20 18.1-20.7 29.5-7-6.9-14.8-10.3-23.3-10.3a35.6 35.6 0 00-11.1 1.9 32 32 0 00-19.7 18.1 37 37 0 00.7 30.5c6.4 13.5 17.4 23.4 32.5 29.5 13.2 5.3 26.5 6.4 35.4 6.4 6.8 0 12.1-.7 13.8-1.3s15.8-10.4 26-24.3 19.3-33.1 12.2-56.6c-4.7-15.3-18.4-26-33.3-26z" }),

    React.createElement("path", {
      fill: "#ffcbcb",
      stroke: "#ffcbcb",
      strokeMiterlimit: "10",
      d: "M121.5 124.7c14.2 42.5-35.3 79.3-36.3 77.3s38.5-37 27.1-74.4c-4.8-15.9-19.5-25.6-34.2-23.7l1.6-.8c17-7.2 35.7 3.1 41.8 21.6z",
      style: { mixBlendMode: "multiply" } }),

    React.createElement("path", {
      fill: "#ffcbcb",
      d: "M24.8 124.1a29.4 29.4 0 0116.8-.9 34 34 0 00-7.7 1.6c-17.5 5.7-25.4 27-17.1 44.5 11.1 23.2 34.2 31.2 52.5 33.4-18.8-.6-48.6-6.8-61.6-34.2-8.3-17.4-.4-38.7 17.1-44.4z",
      style: { mixBlendMode: "soft-light" } })),


    React.createElement("g", null,
    React.createElement("path", {
      fill: "#cff",
      d: "M41.2 99.5h-.4c-3.3-.3-39.6-13.4-39.3-45 .1-13.2 10.3-24 22.7-24l2.8.2C36.3 32 42.6 37.5 45.5 47c3.5-6.8 10.1-12.8 20.4-12.8h1.3a21.3 21.3 0 0115.6 8 24.7 24.7 0 015 19.5C83 92 46.2 99.5 41.2 99.5z" }),

    React.createElement("path", {
      fill: "#453d84",
      d: "M24.1 32l2.6.2C39 33.9 43.5 43.1 45.1 51.9c2.5-8.2 9.3-16.2 20.7-16.2H67c12.6.6 21.3 12.6 19.3 25.7C81.7 90.9 45.5 98 41.2 98h-.3C37.8 97.8 2.8 84.6 3 54.5 3.1 42.1 12.8 32 24.1 32m0-3a23.3 23.3 0 00-17 7.5A26.2 26.2 0 000 54.4c-.1 13.5 6.4 25.7 18.9 35.4 9.3 7.3 19.5 11 21.8 11.2h.5c5.2 0 43.2-7.8 48.1-39.1A26.2 26.2 0 0084 41.2a22.8 22.8 0 00-16.7-8.5h-1.4a23.3 23.3 0 00-20.1 10.8c-2.9-6.7-8.4-12.9-18.7-14.3l-3-.2z" }),

    React.createElement("path", {
      fill: "#cff",
      d: "M86.3 61.4C82.4 91.7 41 99.6 40.9 98s34.7-11.2 38.9-37.6c1.8-11.2-4.3-21.5-13.9-24.7h1.2c12.6.6 21 12.5 19.2 25.7z",
      style: { mixBlendMode: "multiply" } }),

    React.createElement("g", { style: { mixBlendMode: "hard-light" } },
    React.createElement("path", {
      fill: "#cff",
      d: "M27.1 32.2a20.1 20.1 0 0110.6 4.5 23.2 23.2 0 00-5.2-1.3C20 33.7 8.8 44.3 8.7 57.6 8.6 75.2 20.5 87 31 93.8c-11.4-6-27.8-18.7-27.7-39.4.1-13.2 11.3-23.9 23.8-22.2z",
      style: { mixBlendMode: "soft-light" } }))))))));








}

function Unicorn() {
  return (
    React.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 239.4 245.6" },
    React.createElement("g", { style: { isolation: "isolate" } },
    React.createElement("g", { "data-name": "Layer 1" },
    React.createElement("g", null,
    React.createElement("path", {
      fill: "#ccd0ff",
      d: "M220.1 83.2c1.1 2.1.1 3.4-2.2 3a9.1 9.1 0 00-7.2 2.3c-1.6 1.7-3.2 1.1-3.6-1.2a9.1 9.1 0 00-4.4-6.1c-2.1-1-2.1-2.7 0-3.8a9.1 9.1 0 004.4-6.1c.3-2.3 2-2.8 3.6-1.2a9.1 9.1 0 007.2 2.3c2.3-.4 3.3 1 2.2 3a9.1 9.1 0 000 7.8z" }),

    React.createElement("path", {
      fill: "none",
      stroke: "#453d84",
      strokeLinecap: "round",
      strokeLinejoin: "round",
      strokeWidth: "3",
      d: "M220.1 83.2c1.1 2.1.1 3.4-2.2 3a9.1 9.1 0 00-7.2 2.3c-1.6 1.7-3.2 1.1-3.6-1.2a9.1 9.1 0 00-4.4-6.1c-2.1-1-2.1-2.7 0-3.8a9.1 9.1 0 004.4-6.1c.3-2.3 2-2.8 3.6-1.2a9.1 9.1 0 007.2 2.3c2.3-.4 3.3 1 2.2 3a9.1 9.1 0 000 7.8z" }),

    React.createElement("g", null,
    React.createElement("g", {
      stroke: "#453d84",
      strokeLinecap: "round",
      strokeLinejoin: "round",
      strokeWidth: "3" },

    React.createElement("path", {
      fill: "#cce8fe",
      d: "M115.5 100.7c20.5 14.6 34.1 34.6 30.4 68.1-2.6 24.6 8.3 51.7 32.2 59.3s54.6-15.5 59.8-25.6h-.1c-12.5 9.3-31.7 18.1-47.5 13-23.9-7.6-33.5-35.8-32.2-59.3 2-34.5-16.5-49.7-42.6-55.5z" }),

    React.createElement("path", {
      fill: "#ffffcd",
      d: "M115.5 100.7c20.5.5 73.4-30.1 72.9 41-.3 46.1 23 57 49.5 60.9-8.9-2.7-25.4-18.1-26.5-39-1.4-26.1-8.4-67.7-34.2-82.4s-49.4 19.7-61.7 19.5z" }),

    React.createElement("path", {
      fill: "#cbffe4",
      d: "M116.9 101.6c24.3 8.8 41.5 17.1 41.3 54.8-.2 24.5 8.3 51.7 32.2 59.3 15.9 5.1 35.1-3.7 47.6-13h0c-.3.2-13.3 8.8-36-.7-24.8-10.4-29.2-34.7-31.2-63.4-3.1-45.6-30.5-29-53.9-37z" }),

    React.createElement("path", {
      fill: "#e8fecd",
      d: "M115.5 100.7c22.8 8.6 51.5-7.7 55.3 37.8 2.4 28.6 6.3 55.4 31.1 64.5 21 7.7 33.4 1.2 36-.4h.1a9.2 9.2 0 01-2.4-.4c-23.1-4.1-42.4-16.6-44.7-62.3-3.6-69.1-54.9-38.7-75.4-39.2z" })),


    React.createElement("g", { stroke: "#453d84", strokeMiterlimit: "10", strokeWidth: "3" },
    React.createElement("path", {
      fill: "#fff",
      d: "M175.1 63.9c9.3 8.9-4.5 52.8-13 50.1-6-1.9-8.1-11.2-18.6-18.4-5.5-3.8-23.3-13-21.1-16 6.8-9.8 42.8-25.2 52.7-15.7z" }),

    React.createElement("path", {
      fill: "#ffcdff",
      d: "M163.6 75.2c4.8 5-3.1 28.5-7.7 26.8s-4.1-6.3-9.7-10.6c-2.9-2.2-12.4-7.8-11.1-9.3 4.1-5.2 23.4-12.2 28.5-6.9z" })),


    React.createElement("g", { stroke: "#453d84", strokeMiterlimit: "10", strokeWidth: "3" },
    React.createElement("path", {
      fill: "#fff",
      d: "M39.2 64c8.8-9.6 54.9 5.7 52.4 14.3-1.8 6-12.7 6-19.7 16.6-3.6 5.5-12.5 23.5-15.5 21.5-10-6.7-26.5-42.2-17.2-52.4z" }),

    React.createElement("path", {
      fill: "#ffcdff",
      d: "M51 75.6c4.9-4.9 30.7 2.6 29.1 7.2s-8.4 4.2-12.5 9.8c-2.2 2.9-5.9 13.8-7.5 12.6-5.2-3.9-14.3-24.4-9.1-29.6z" })),


    React.createElement("path", {
      fill: "#fff",
      stroke: "#453d84",
      strokeMiterlimit: "10",
      strokeWidth: "3",
      d: "M176.2 212.3h-.1c-16.7 34.7-56.3 33.5-79.5 29.9-8.1-1.3-33.7-6.8-47.1-29.8a59.6 59.6 0 01-6.8-18.4c-3.8-19.5 6.9-65 6.9-65C57.3 96.8 69.2 79.3 97 79.3h28c17.7.8 41.7 11.8 49.9 51.5 7.5 36.9 5.3 72.8 1.3 81.5z" }),

    React.createElement("path", {
      fill: "#e8ebef",
      d: "M176.2 210.7h-.1c-13.7 28.4-42.6 32.8-65.4 31.5 19.7-1.2 40.9-8.5 51.9-31.5h.1c4.1-8.6 6.3-44.5-1.3-81.5-8.1-39.7-32.2-50.7-49.9-51.5H125c17.7.8 41.7 11.8 49.9 51.5 7.5 37 5.3 72.9 1.3 81.5z",
      style: { mixBlendMode: "darken" } }),

    React.createElement("path", {
      fill: "#ffcdff",
      stroke: "#453d84",
      strokeMiterlimit: "10",
      strokeWidth: "3",
      d: "M176.4 211.8c-16.7 34.9-56 34.4-79.2 30.8-8.1-1.3-33.7-6.8-47.1-29.8 15.3-7.2 38.2-11.7 63.6-11.7s47.4 3.7 62.7 10.7z" }),

    React.createElement("g", {
      fill: "none",
      stroke: "#453d84",
      strokeLinecap: "round",
      strokeMiterlimit: "10",
      strokeWidth: "4" },

    React.createElement("path", { d: "M73.7 182.5a12.3 12.3 0 1124.6 0" }),
    React.createElement("path", { d: "M86 169.9L86 163.8" }),
    React.createElement("path", { d: "M97.8 175.7L101.8 173.6" }),
    React.createElement("path", { d: "M74.7 174.4L71.2 171.9" }),
    React.createElement("g", null,
    React.createElement("path", { d: "M128.6 182.5a12.3 12.3 0 0124.6 0" }),
    React.createElement("path", { d: "M140.9 169.9L140.9 163.8" }),
    React.createElement("path", { d: "M152.8 175.6L156.8 173.6" }),
    React.createElement("path", { d: "M129.6 174.4L126.1 171.8" }))),


    React.createElement("g", { fill: "#453d84" },
    React.createElement("path", { d: "M106.8 227.9c-1.2 2.9-3.9 4.5-6.1 3.7s-2.3-5.1-1.1-8.1 3.2-3.1 5.5-2.5 2.9 4 1.7 6.9zM128.9 225.7c.7 3.1-.6 6-2.9 6.5s-4.8-2.9-5.5-6 .9-4.4 3.1-5.2 4.6 1.6 5.3 4.7z" })),

    React.createElement("g", { stroke: "#453d84", strokeWidth: "3" },
    React.createElement("path", {
      fill: "#ffffcd",
      strokeLinecap: "round",
      strokeLinejoin: "round",
      d: "M142.3 84.5c-21.8 2.5-44-13.4-56.2 17.9-7.7 19.6-16.3 37.8-40 40.4-20 2.2-29.8-4.3-31.7-5.8h2.2c21.2.7 40.7-5 51.6-36.7 16.5-47.8 55.9-18.6 74.1-15.8z" }),

    React.createElement("path", {
      fill: "#ffcbcb",
      strokeLinecap: "round",
      strokeLinejoin: "round",
      d: "M142.3 84.5c-18.2-2.8-61.1-29.8-74.5 20.1-8.8 32.3-29.4 33.7-53.5 32.4 8.4-.5 25.9-8.8 31-23.2 6.3-18 15.8-42.3 41.5-48.5s44.5 17.5 55.5 19.2z" }),

    React.createElement("g", { strokeMiterlimit: "10" },
    React.createElement("path", {
      fill: "#cce8fe",
      d: "M121.9 90.3h0l-1.5.2-8.6.2-8.3.2c-5.1.1-8.3-3.5-7.2-7.5l.7-3.1 2.3-10.4.4-1.9a26.9 26.9 0 0028.2 10.6h.4l.2 2.2v1.1c.8 3.8-2.5 7.6-6.6 8.4z" }),

    React.createElement("path", {
      fill: "#cff",
      d: "M128.3 78.4h-.4A26.9 26.9 0 0199.7 68l3.5-15.9.6-2.5a25.4 25.4 0 0021.7 12.2h1.2v.6l.2 2.1.8 7.9z" }),

    React.createElement("path", {
      fill: "#ffcdff",
      d: "M126.6 61.7h-1.2a25.4 25.4 0 01-21.7-12.2l3.1-14.1.4-1.8a27 27 0 0017.5 8.8l.2 2.3z" }),

    React.createElement("path", {
      fill: "#ffe7cd",
      d: "M124.6 42.5a27 27 0 01-17.5-8.8l.5-2.2 2.2-9.9 1-4.7a27.2 27.2 0 008.8 5.5l3 .9.5 4.4v1.2z" }),

    React.createElement("path", {
      fill: "#ffffcd",
      d: "M122.6 23.3c-4.1-.9-10.4-4.3-11.8-6.4 0-.2.5-2.1.5-2.1l2.3-10.4c.8-3.6 6.7-3.7 7.1-.1l.7 6.7s1.2 12 1.2 12.3z" })),


    React.createElement("path", {
      fill: "#ccd0ff",
      strokeLinecap: "round",
      strokeLinejoin: "round",
      d: "M142.3 84.5c-20.9 7.1-36.8 18.9-40.2 43a43.2 43.2 0 01-40 36.6c-22.3 1.6-45.2-19.3-47.8-27.1h.1c9.2 8.4 24.4 17.6 39.4 16.5 22.6-1.6 36.6-19.9 40-36.6 5-24.6 24.3-32.3 48.5-32.4z" }),

    React.createElement("path", {
      fill: "#e7ccff",
      strokeLinecap: "round",
      strokeLinejoin: "round",
      d: "M140.9 85c-23.2 2.4-40 5.5-47.1 32-4.6 17.2-17.4 34.9-40 36.6-15 1.1-30.3-8-39.4-16.5h0c.3.2 10 8.3 31.9 5.1 23.9-3.5 32.6-19.8 39.9-39.6 11.5-31.5 32.5-15.7 54.7-17.6z" })),


    React.createElement("path", {
      fill: "#ffcdff",
      d: "M175.9 211c-16.7 34.9-56 34.4-79.2 30.8-7-1.1-27.1-5.4-41-21.4 12.4 9.2 26.3 12.1 31.8 12.9 22.3 3.5 59.3 4 77-26.6a90.6 90.6 0 0111.4 4.3z",
      style: { mixBlendMode: "multiply" } })),


    React.createElement("path", {
      fill: "#cce8fe",
      d: "M63.7 41.9c.5 2.6-1 3.8-3.4 2.6a10.4 10.4 0 00-8.6.2c-2.3 1.3-3.9.2-3.5-2.5a10.4 10.4 0 00-2.9-8.1c-2-1.8-1.4-3.7 1.2-4.1a10.4 10.4 0 006.9-5.2c1.1-2.4 3.1-2.5 4.3-.1a10.4 10.4 0 007.1 4.9c2.7.3 3.3 2.2 1.4 4.1a10.4 10.4 0 00-2.5 8.2z" }),

    React.createElement("path", {
      fill: "none",
      stroke: "#453d84",
      strokeLinecap: "round",
      strokeLinejoin: "round",
      strokeWidth: "3",
      d: "M63.7 41.9c.5 2.6-1 3.8-3.4 2.6a10.4 10.4 0 00-8.6.2c-2.3 1.3-3.9.2-3.5-2.5a10.4 10.4 0 00-2.9-8.1c-2-1.8-1.4-3.7 1.2-4.1a10.4 10.4 0 006.9-5.2c1.1-2.4 3.1-2.5 4.3-.1a10.4 10.4 0 007.1 4.9c2.7.3 3.3 2.2 1.4 4.1a10.4 10.4 0 00-2.5 8.2z" }),

    React.createElement("g", null,
    React.createElement("path", {
      fill: "#ffcdff",
      d: "M15.7 114.7h-.3c-1.1-.2-10.5-2.4-13.2-7.7a6.5 6.5 0 01-.1-5.7 5.5 5.5 0 015.4-3.4 11.9 11.9 0 014.5 1c1.2-1.5 3.5-3.9 6.4-3.9a5.6 5.6 0 013.4 1.2 6.5 6.5 0 012.7 5c.2 5.8-7 12.4-7.8 13.1a1.5 1.5 0 01-1 .4z" }),

    React.createElement("path", {
      fill: "#453d84",
      d: "M18.4 96.4a4.1 4.1 0 012.5.9c6.8 5.2-5.2 15.8-5.2 15.8S0 109.7 3.5 101.9a4 4 0 014-2.5 11.8 11.8 0 015 1.5s2.6-4.4 5.9-4.4m0-3c-3 0-5.4 2-6.9 3.7a12.5 12.5 0 00-4.1-.8 7.1 7.1 0 00-6.7 4.3 7.9 7.9 0 00.1 7c3 5.9 13.1 8.2 14.2 8.5h.6a3 3 0 002-.8c1.4-1.3 8.6-7.9 8.3-14.3a7.9 7.9 0 00-3.3-6.1 7 7 0 00-4.3-1.5z" })),


    React.createElement("g", null,
    React.createElement("path", {
      fill: "#cdffcc",
      d: "M165.6 46.9h-.6c-1-.4-9.8-4.4-11.4-10.1a6.5 6.5 0 011-5.6 5.4 5.4 0 014.6-2.5 10.4 10.4 0 015.6 2c1.3-1.1 3.5-2.7 6-2.7a5.5 5.5 0 014.2 2 6.5 6.5 0 011.7 5.4c-.9 5.8-9.3 10.8-10.2 11.4z" }),

    React.createElement("path", {
      fill: "#453d84",
      d: "M170.7 29.4a4 4 0 013.1 1.5c5.7 6.5-8.2 14.5-8.2 14.5s-14.7-6.4-9.8-13.5a3.9 3.9 0 013.4-1.8c2.7 0 5.5 2.4 5.7 2.5s2.9-3.2 5.9-3.2m0-3a10.5 10.5 0 00-6.1 2.4 11.1 11.1 0 00-5.5-1.7 7 7 0 00-5.8 3.1 7.9 7.9 0 00-1.2 6.9c1.8 6.3 11.2 10.6 12.3 11.1l1.2.3a3 3 0 001.5-.4c1.7-1 9.9-6.1 11-12.4a7.9 7.9 0 00-2-6.7 6.9 6.9 0 00-5.3-2.5z" })))))));







}

function Star() {
  return (
    React.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 262.2 235.7" },
    React.createElement("g", { style: { isolation: "isolate" } },
    React.createElement("g", { "data-name": "Layer 1" },
    React.createElement("g", null,
    React.createElement("g", { stroke: "#453d84", strokeWidth: "3" },
    React.createElement("path", {
      fill: "#e7ccff",
      strokeMiterlimit: "10",
      d: "M259.5 152.4l-22.7 2-.4-.7c-27-47.6-63.6-68.6-132.7-82.2h0l-1.6-.3 2.8-15.1c82.6 14.3 118 36 155.7 94.1a1.4 1.4 0 01-1.1 2.2z" }),

    React.createElement("path", {
      fill: "#ffcbcb",
      strokeMiterlimit: "10",
      d: "M236.4 153.7c-27-47.6-63.6-68.6-132.7-82.2h0l-1.6-.3-.4 2-2.6 13.6 2.4.4c43 6.9 89.4 30.4 111.1 69.3h.4l23.9-2.1z" }),

    React.createElement("path", {
      fill: "#cbffe4",
      strokeMiterlimit: "10",
      d: "M212.5 156.6s-9 16.9-12.1 24.5c-26.6-50.8-97.1-78-104.2-79.2l2.8-15 2.4.4c43.1 6.9 89.5 30.4 111.1 69.3z" }),

    React.createElement("path", {
      fill: "#cce8fe",
      strokeLinecap: "round",
      strokeLinejoin: "round",
      d: "M202.2 177.1l-8.7 22.9h0c-7-27.3-62.9-75.2-100.7-80.3l3.4-17.9c43.3 10.7 85.5 35.2 106 75.3z" })),


    React.createElement("path", {
      fill: "#ffffcd",
      d: "M36.8 140a12.1 12.1 0 01-9.2-4.3A11.8 11.8 0 0125 126l5-30.5a9 9 0 00-2.6-8L5.2 66.1a12 12 0 016.6-20.5L42.3 41a9 9 0 006.8-5L62.6 8.2a12 12 0 0121.6-.1l13.7 27.7a9 9 0 006.8 4.9l30.6 4.3a12 12 0 016.8 20.5l-22 21.6a9 9 0 00-2.6 8l5.4 30.4a11.8 11.8 0 01-2.6 9.8 12.1 12.1 0 01-9.2 4.4 11.9 11.9 0 01-5.6-1.4L78.1 124a9 9 0 00-8.4 0l-27.3 14.5a11.9 11.9 0 01-5.6 1.5z" }),

    React.createElement("path", {
      fill: "#453d84",
      d: "M73.4 3a10.4 10.4 0 019.4 5.8l13.8 27.6a10.5 10.5 0 007.9 5.7l30.6 4.3a10.5 10.5 0 015.9 18L119 86a10.5 10.5 0 00-3 9.3l5.4 30.4a10.5 10.5 0 01-15.2 11.2l-27.4-14.2a10.5 10.5 0 00-9.8 0l-27.3 14.5a10.5 10.5 0 01-15.3-11l5.1-30.5a10.5 10.5 0 00-3.1-9.3L6.2 65A10.5 10.5 0 0112 47l30.5-4.6a10.5 10.5 0 007.9-5.8L63.9 8.9A10.4 10.4 0 0173.4 3m0-3a13.4 13.4 0 00-12.2 7.6L47.7 35.3a7.5 7.5 0 01-5.6 4.1L11.5 44a13.5 13.5 0 00-7.4 23.1l22.2 21.5a7.5 7.5 0 012.2 6.6l-5.1 30.5a13.3 13.3 0 003 10.9 13.6 13.6 0 0010.4 4.8 13.4 13.4 0 006.3-1.6l27.3-14.5a7.5 7.5 0 017 0l27.4 14.2a13.4 13.4 0 006.2 1.5 13.6 13.6 0 0010.4-4.9 13.3 13.3 0 002.9-11L119 94.8a7.5 7.5 0 012.1-6.7l22-21.6a13.5 13.5 0 00-7.6-23L105 39.2a7.5 7.5 0 01-5.7-4.1L85.5 7.5A13.4 13.4 0 0073.4 0z" }),

    React.createElement("path", {
      fill: "#fcf8b6",
      d: "M118.9 86.1a10.5 10.5 0 00-3 9.3l5.4 30.4A10.5 10.5 0 01106 137l-27.4-14.2a10.5 10.5 0 00-9.8 0l-27.3 14.6c-5.1 3-12.2.1-14.6-5.2a10.5 10.5 0 004.6-1.2l27.3-14.5a10.5 10.5 0 019.8 0L96 130.6a10.5 10.5 0 0015.2-11.2L105.9 89a10.5 10.5 0 013-9.3l22-21.6a10.4 10.4 0 002.2-11.7l1.9.3c8.6 1.2 12.2 11 5.9 17.9z" }),

    React.createElement("path", {
      fill: "#fffede",
      d: "M84.5 12.2c.9 1.9-.8 3.3-3.8 3.3S71.3 23.6 69.6 27l-7.4 15.2a55.8 55.8 0 01-5.3 8.9c-1.2 1.5-8.8 3.6-12.6 4.2l-16.7 2.5A34.3 34.3 0 0016 62c-2.6 1.7-5.4 7.2-7 5.7s-3.3-5.8-4-9.6L7 52a25.1 25.1 0 0111.9-6l16.7-2.5a55.9 55.9 0 0010.1-2.4c1.8-.7 6.1-7.3 7.8-10.7l7.4-15.2a25.1 25.1 0 019.3-9.6h6.4c3.4 1.8 7 4.7 7.9 6.6z" }),

    React.createElement("g", null,
    React.createElement("path", {
      fill: "#ffffcd",
      d: "M50.6 193.2a4.1 4.1 0 01-4-4.7l1.2-7.4a1 1 0 00-.3-.9l-5.3-5.2a4 4 0 012.2-6.9l7.4-1.1a1 1 0 00.8-.6l3.3-6.7a4 4 0 017.3 0l3.3 6.7a1 1 0 00.8.6l7.4 1a4 4 0 012.3 6.9l-5.3 5.2a1 1 0 00-.3.9l1.3 7.4a4 4 0 01-5.9 4.3l-6.6-3.4h-1l-6.6 3.5a4 4 0 01-2 .4z" }),

    React.createElement("path", {
      fill: "#453d84",
      d: "M59.5 158.9a2.5 2.5 0 012.3 1.4l3.3 6.7a2.5 2.5 0 001.9 1.4l7.4 1a2.5 2.5 0 011.4 4.3l-5.3 5.3a2.5 2.5 0 00-.7 2.3l1.3 7.4a2.5 2.5 0 01-3.7 2.7l-6.6-3.4a2.5 2.5 0 00-2.4 0l-6.6 3.5a2.5 2.5 0 01-3.7-2.7l1.2-7.4a2.5 2.5 0 00-.7-2.2l-5.4-5.2a2.5 2.5 0 011.4-4.3l7.4-1.1a2.5 2.5 0 001.9-1.4l3.3-6.7a2.5 2.5 0 012.3-1.4m0-3a5.5 5.5 0 00-5 3.1l-3.2 6.5-7.2 1.1a5.5 5.5 0 00-3 9.5l5.2 5-1.2 7.1a5.5 5.5 0 008.1 5.8l6.4-3.4L66 194a5.5 5.5 0 008-5.9l-1.2-7.1 5.2-5.1a5.5 5.5 0 00-3.1-9.4l-7.2-1-3.2-6.5a5.5 5.5 0 00-5-3.1z" }),

    React.createElement("path", {
      fill: "#ffffcd",
      d: "M70.5 179a2.5 2.5 0 00-.7 2.3l1.3 7.4a2.5 2.5 0 01-3.7 2.7l-6.6-3.4a2.5 2.5 0 00-2.4 0l-6.6 3.5a2.6 2.6 0 01-3.5-1.3l1.1-.3 6.6-3.5a2.5 2.5 0 012.4 0l6.6 3.4a2.5 2.5 0 003.7-2.7l-1.3-7.4a2.5 2.5 0 01.7-2.3l5.3-5.2a2.5 2.5 0 00.5-2.8h.5a2.5 2.5 0 011.4 4.3z" }),

    React.createElement("g", { style: { mixBlendMode: "overlay" } },
    React.createElement("path", {
      fill: "#ffffcd",
      d: "M62.2 161.2c.2.5-.2.8-.9.8s-2.7 2.8-3.6 4.6a34.5 34.5 0 01-2.2 4c-.3.4-3 1-5.1 1.3a16.9 16.9 0 00-4.8 1.3c-.6.4-1.3 1.7-1.7 1.4a6.2 6.2 0 01-1-2.7c-.2-1.1 3.4-2.6 5.4-2.9l4.5-.9c.4-.2 1.9-2.6 2.8-4.4a11.3 11.3 0 013.5-4.3c.9-.5 2.9 1.3 3.1 1.8z" }))),



    React.createElement("g", null,
    React.createElement("path", {
      fill: "#ffcbcb",
      d: "M110.3 234.2a4.1 4.1 0 01-4-4.7l1.2-7.4a1 1 0 00-.3-.9l-5.4-5.2a4 4 0 012.2-6.9l7.4-1.1a1 1 0 00.8-.6l3.3-6.7a4 4 0 017.3 0l3.3 6.7a1 1 0 00.8.6l7.4 1a4 4 0 012.3 6.9l-5.3 5.2a1 1 0 00-.3.9l1.3 7.4a4 4 0 01-5.9 4.3l-6.6-3.4h-1l-6.6 3.5a4 4 0 01-1.9.4z" }),

    React.createElement("path", {
      fill: "#453d84",
      d: "M119.2 200a2.5 2.5 0 012.3 1.4l3.3 6.7a2.5 2.5 0 001.9 1.4l7.4 1a2.5 2.5 0 011.4 4.3l-5.3 5.2a2.5 2.5 0 00-.7 2.3l1.3 7.4a2.5 2.5 0 01-3.7 2.7l-6.6-3.4a2.5 2.5 0 00-2.4 0l-6.6 3.5a2.5 2.5 0 01-3.7-2.7l1.2-7.4a2.5 2.5 0 00-.7-2.2l-5.4-5.2a2.5 2.5 0 011.4-4.3l7.4-1.1a2.5 2.5 0 001.9-1.4l3.3-6.7a2.5 2.5 0 012.3-1.4m0-3a5.5 5.5 0 00-5 3.1l-3.2 6.5-7.2 1.1a5.5 5.5 0 00-3 9.5l5.2 5-1.2 7.1a5.5 5.5 0 008.1 5.8l6.4-3.4 6.4 3.3a5.5 5.5 0 008-5.9l-1.3-7.1 5.2-5.1a5.5 5.5 0 00-3.1-9.4l-7.2-1-3.2-6.5a5.5 5.5 0 00-5-3.1z" }),

    React.createElement("path", {
      fill: "#ffcbcb",
      d: "M130.2 220.1a2.5 2.5 0 00-.7 2.3l1.3 7.4a2.5 2.5 0 01-3.7 2.7l-6.6-3.4a2.5 2.5 0 00-2.4 0l-6.6 3.5a2.6 2.6 0 01-3.5-1.3l1.1-.3 6.6-3.5a2.5 2.5 0 012.4 0l6.6 3.4a2.5 2.5 0 003.7-2.7l-1.3-7.4a2.5 2.5 0 01.7-2.3l5.3-5.2a2.5 2.5 0 00.5-2.8h.5a2.5 2.5 0 011.4 4.3z" }),

    React.createElement("g", { style: { mixBlendMode: "overlay" } },
    React.createElement("path", {
      fill: "#ffcbcb",
      d: "M121.8 202.2c.2.5-.2.8-.9.8s-2.7 2.8-3.6 4.6a34.5 34.5 0 01-2.2 4c-.3.4-3 1-5.1 1.3a16.9 16.9 0 00-4.8 1.3c-.6.4-1.3 1.7-1.7 1.4a6.2 6.2 0 01-1-2.7c-.2-1.1 3.4-2.6 5.4-2.9l4.5-.9c.4-.2 1.9-2.6 2.8-4.4a11.3 11.3 0 013.5-4.3c1-.5 2.9 1.3 3.1 1.8z" }))),



    React.createElement("g", null,
    React.createElement("path", {
      fill: "#cbffe4",
      d: "M174.9 44.8a4.1 4.1 0 01-4-4.7l1.2-7.4a1 1 0 00-.3-.9l-5.4-5.2a4 4 0 012.2-6.9l7.4-1.1a1 1 0 00.8-.6l3.3-6.7a4 4 0 017.3 0l3.3 6.7a1 1 0 00.8.6l7.4 1a4 4 0 012.3 6.9l-5.3 5.2a1 1 0 00-.3.9l1.3 7.4a4 4 0 01-5.9 4.3l-6.6-3.4h-1l-6.6 3.5a4 4 0 01-1.9.4z" }),

    React.createElement("path", {
      fill: "#453d84",
      d: "M183.7 10.5A2.5 2.5 0 01186 12l3.3 6.7a2.5 2.5 0 001.9 1.4l7.4 1a2.5 2.5 0 011.4 4.3l-5.3 5.2a2.5 2.5 0 00-.7 2.3l1.3 7.4a2.5 2.5 0 01-3.7 2.7l-6.6-3.5a2.5 2.5 0 00-2.4 0l-6.5 3.5a2.5 2.5 0 01-3.7-2.7l1.2-7.4a2.5 2.5 0 00-.7-2.2l-5.4-5.2a2.5 2.5 0 011.4-4.3l7.4-1.1a2.5 2.5 0 001.9-1.4l3.3-6.7a2.5 2.5 0 012.3-1.4m0-3a5.5 5.5 0 00-5 3.1l-3.2 6.5-7.2 1.1a5.5 5.5 0 00-3 9.5l5.2 5-1.2 7.1a5.5 5.5 0 008.1 5.8l6.4-3.4 6.4 3.3a5.5 5.5 0 008-5.9l-1.3-7.1 5.2-5.1a5.5 5.5 0 00-3.1-9.4l-7.2-1-3.2-6.5a5.5 5.5 0 00-5-3.1z" }),

    React.createElement("path", {
      fill: "#cbffe4",
      d: "M194.8 30.6a2.5 2.5 0 00-.7 2.3l1.3 7.4a2.5 2.5 0 01-3.7 2.7l-6.7-3.5a2.5 2.5 0 00-2.4 0l-6.5 3.5a2.6 2.6 0 01-3.5-1.3l1.1-.3 6.6-3.5a2.5 2.5 0 012.4 0l6.6 3.4a2.5 2.5 0 003.7-2.7l-1.3-7.4a2.5 2.5 0 01.7-2.3l5.3-5.2a2.5 2.5 0 00.5-2.8h.5a2.5 2.5 0 011.4 4.3z" }),

    React.createElement("g", { style: { mixBlendMode: "overlay" } },
    React.createElement("path", {
      fill: "#cbffe4",
      d: "M186.4 12.8c.2.5-.2.8-.9.8s-2.7 2.8-3.6 4.6a34.5 34.5 0 01-2.2 4c-.3.4-3 1-5.1 1.3a16.9 16.9 0 00-4.8 1.3c-.6.4-1.3 1.7-1.7 1.4a6.2 6.2 0 01-1-2.7c-.2-1.1 3.4-2.6 5.4-2.9l4.5-.9c.4-.2 1.9-2.6 2.8-4.4a11.3 11.3 0 013.5-4.3c.9-.5 2.9 1.3 3.1 1.8z" }))))))));








}

function Rainbow() {
  return (
    React.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 266.1 154.2" },
    React.createElement("g", null,
    React.createElement("g", { stroke: "#453d84", strokeMiterlimit: "10", strokeWidth: "3" },
    React.createElement("path", {
      fill: "#ccd0ff",
      d: "M130.6 1.5C66.2 1.5 13.8 56 13.8 123h52.7c0-36.8 28.7-66.7 64.1-66.7s64.1 29.9 64.1 66.7h52.6C247.3 56 195 1.5 130.6 1.5z" }),

    React.createElement("path", {
      fill: "#ffcdff",
      d: "M130.6 15.2C73.5 15.2 27 63.6 27 123h39.5c0-36.8 28.7-66.7 64.1-66.7s64.1 29.9 64.1 66.7h39.5c0-59.4-46.5-107.8-103.6-107.8z" }),

    React.createElement("path", {
      fill: "#fbf6db",
      d: "M130.6 28.9c-49.9 0-90.4 42.2-90.4 94.1h26.3c0-36.8 28.7-66.7 64.1-66.7s64.1 29.9 64.1 66.7H221c0-51.9-40.5-94.1-90.4-94.1z" }),

    React.createElement("path", {
      fill: "#cdffcc",
      d: "M130.6 42.6C88 42.6 53.3 78.7 53.3 123h13.2c0-36.8 28.7-66.7 64.1-66.7s64.1 29.9 64.1 66.7h13.2c0-44.3-34.7-80.4-77.3-80.4z" })),


    React.createElement("path", {
      fill: "#cce8fe",
      d: "M224.5 152.7h-6.8L200 152l-11.4-.4a17.5 17.5 0 01-7.6-2.1l-1-.6a18.4 18.4 0 01-8.7-16.6 18.1 18.1 0 0114-16.9h.6l3.1-.3h.6a17.2 17.2 0 019.2 3.1 34.8 34.8 0 012.4-11.9A34.2 34.2 0 01215 89.5a31.7 31.7 0 0115.6-4.7h4c17.6 1.6 30.7 17.2 30 35.5-.6 15.4-16 31.3-26.9 32-4.8.4-10.3.4-13.2.4z" }),

    React.createElement("path", {
      fill: "#453d84",
      d: "M231.6 86.3h2.8c16.6 1.5 29.3 16.4 28.6 34-.6 15.1-15.8 30-25.5 30.5-3.8.2-8.7.3-13 .3h-6.7l-17.7-.7-11.4-.4a16.1 16.1 0 01-7-1.9l-.9-.5a17 17 0 01-8-15.3 16.6 16.6 0 0112.8-15.5h.6l2.8-.3h.6a15.8 15.8 0 0110.8 4.9 33.4 33.4 0 012.3-14.7 32.5 32.5 0 0113.2-15.9 30.1 30.1 0 0114.8-4.5h1m0-3h-1.1a33.2 33.2 0 00-16.3 4.9 35.7 35.7 0 00-14.4 17.3 37 37 0 00-1.4 4.2 36.5 36.5 0 00-1 5.7 18.6 18.6 0 00-7.8-2.1h-.7a18 18 0 00-3.3.3h-.7a19.6 19.6 0 00-15.1 18.2 19.9 19.9 0 009.4 18l1.1.6a19.2 19.2 0 008.3 2.3l11.4.4 17.8.7h6.8c2.9 0 8.4 0 13.1-.3s12.5-4.4 18.2-10.8 9.8-15.1 10.1-22.6c.8-19.1-13-35.4-31.3-37.1h-3.1z" }),

    React.createElement("path", {
      fill: "#cce8fe",
      d: "M262.8 120.4c-.6 15.1-15.8 30-25.5 30.5-6.1.4-14.8.4-19.7.2l-17.7-.7-11.4-.4a16.1 16.1 0 01-7-1.9l-.9-.5A17.1 17.1 0 01173 137a16.9 16.9 0 003.6 2.9l.9.5a16.1 16.1 0 007 1.9l11.4.4 17.7.7c4.9.1 13.6.1 19.7-.2 9.7-.6 24.9-15.4 25.5-30.5a33.8 33.8 0 00-2.1-13.3 33.5 33.5 0 016.1 21z",
      style: { mixBlendMode: "multiply" } }),

    React.createElement("path", {
      fill: "#cce8fe",
      d: "M259.8 104a30.9 30.9 0 00-20.6-10.7h-3.8a30.1 30.1 0 00-14.8 4.5 32.5 32.5 0 00-13.2 15.9 34.8 34.8 0 00-1.3 3.9 33.6 33.6 0 00-1 10.8 15.8 15.8 0 00-10.8-4.9 15.2 15.2 0 00-3.4.2h-.6a16.9 16.9 0 00-11.8 22 17 17 0 01-5.5-13.4 16.6 16.6 0 0112.8-15.5h.6a15.2 15.2 0 013.4-.2 15.8 15.8 0 0110.8 4.9 33.8 33.8 0 011-10.8 34.8 34.8 0 011.3-3.9 32.5 32.5 0 0113.1-16 30.1 30.1 0 0114.8-4.5h3.8a31.4 31.4 0 0125.2 17.7z",
      style: { mixBlendMode: "overlay" } }),

    React.createElement("g", null,
    React.createElement("path", {
      fill: "#cce8fe",
      d: "M33.9 135a32.1 32.1 0 01-17.7-5.7 33.7 33.7 0 01-14.7-28.2A34.3 34.3 0 0113 75.8a31.8 31.8 0 0121.1-8.1h2.7l2.2.4a31.4 31.4 0 0117.8 9.3 33.4 33.4 0 016.7 10h2.8a15.8 15.8 0 0114.2 12.9l1.4.5h.1a17.7 17.7 0 019.5 10.2 18.5 18.5 0 011.1 6.3 17.3 17.3 0 01-.3 3.1 18.2 18.2 0 01-17.6 15z" }),

    React.createElement("path", {
      fill: "#453d84",
      d: "M34.1 69.3h2.6l2.1.3a30.1 30.1 0 0116.9 8.9 32.1 32.1 0 016.9 10.6l2.6-.3h1a14.3 14.3 0 0113 12.6l2.2.7a16.1 16.1 0 018.7 9.4 17.1 17.1 0 011 5.8 15.9 15.9 0 01-.3 2.9 16.6 16.6 0 01-16.1 13.7h-4.9l-17.6-.3-16.8-.2h-1.5A30.6 30.6 0 0117 128a32.3 32.3 0 01-14-26.9A32.8 32.8 0 0114 77a30.2 30.2 0 0120.1-7.7m0-3A33.3 33.3 0 0012 74.7a35.8 35.8 0 00-12 26.4 35.2 35.2 0 0015.4 29.5 33.6 33.6 0 0018.5 6h1.4l16.8.2 17.7.2h4.9a19.7 19.7 0 0019.1-16.2 18.8 18.8 0 00.3-3.4 20 20 0 00-1.2-6.8 19.2 19.2 0 00-10.4-11h-.2l-.6-.3A17.3 17.3 0 0066.3 86h-2a35 35 0 00-6.6-9.5 32.9 32.9 0 00-18.6-9.8l-2.3-.3h-2.7z" }),

    React.createElement("path", {
      fill: "#cce8fe",
      d: "M90.7 121.2a16.1 16.1 0 01-15.9 13h-4.6l-17.2-.3-16.4-.3h-1.4c-6-.1-12.4-1.4-17.2-4.6a31.6 31.6 0 01-7.5-7c4.7 3 10.8 4.1 16.6 4.2h1.4l16.5.3 17.2.3h4.5c7.8.1 15.4-7.5 16.7-15a14.5 14.5 0 00.2-2.7 30.2 30.2 0 00-1.7-7.2c.1 0 7.3 5 8.8 9a15.8 15.8 0 011 5.5 46.1 46.1 0 01-1 4.8z", style: { mixBlendMode: "multiply" } }),

    React.createElement("path", {
      fill: "#cce8fe",
      d: "M58.4 81.7A29.5 29.5 0 0047 77.4l-2.1-.3a30.2 30.2 0 00-22.7 7.6 32.8 32.8 0 00-10.9 24.2 32 32 0 006.4 19.6l-.6-.4a32.3 32.3 0 01-14.1-27A32.7 32.7 0 0114 77a30.2 30.2 0 0122.7-7.6l2.1.3a30.1 30.1 0 0116.9 8.9 31.6 31.6 0 012.7 3.1z", style: { mixBlendMode: "overlay" } })))));





}

function Mushrooms() {
  return (
    React.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 260.3 199.9" },
    React.createElement("g", { style: { isolation: "isolate" } },
    React.createElement("g", { "data-name": "Layer 1" },
    React.createElement("g", null,
    React.createElement("rect", {
      width: "118.6",
      height: "63.87",
      x: "37.3",
      y: "107.8",
      fill: "#ffe7cd",
      stroke: "#453d84",
      strokeMiterlimit: "10",
      strokeWidth: "3",
      rx: "23",
      ry: "23" }),

    React.createElement("path", {
      fill: "#cdffcc",
      stroke: "#453d84",
      strokeMiterlimit: "10",
      strokeWidth: "3",
      d: "M190.4 84.6v11.2a30.9 30.9 0 01-30.8 30.8h-126A30.9 30.9 0 012.8 95.8v-7.6a85.7 85.7 0 013.8-25.4A87 87 0 0189.5 1.5h17.8a82.1 82.1 0 0131.4 6.2h0a83.7 83.7 0 0136.2 28.7 82.5 82.5 0 0115.5 48.2z" }),

    React.createElement("path", {
      fill: "#ffe7cd",
      d: "M154.2 128.1c.6 2.6.2 12.7.2 12.7 1.5 18.2-5.9 31.6-27.5 29.8l-61-1c-12.4 1-24.3-3.8-26.9-18.4 5.1 5.9 13.1 8.9 21.2 9l61 1c23.8.7 29-13.1 29.2-29.7l-.2-3.5h4z", style: { mixBlendMode: "multiply" } }),

    React.createElement("path", { d: "M182.1,114.6c-5.9,6.6-13.1,10.6-24.2,10.5H31.7c-10.9-1.2-14.5-4.4-19.3-10.2-2.5-2.9,1.1-2.9,7.5-2.9h126C155.5,111.9,186.4,109.9,182.1,114.6Z", fill: "#cdffcc", style: { mixBlendMode: "multiply" } }),
    React.createElement("path", { d: "M100.5,17.5C64,22.8,48,33.4,26.3,66.6,23.6,70.8,6,67.8,9.1,60.1,22.1,27,52.2,2.6,89.2,2.6h16.9a77.5,77.5,0,0,1,29.9,6h0C149.9,14.4,100.5,17.5,100.5,17.5Z", fill: "#cdffcc", style: { mixBlendMode: "overlay" } }),
    React.createElement("circle", {
      cx: "91.4",
      cy: "88.1",
      r: "25.6",
      fill: "#fff",
      stroke: "#453d84",
      strokeLinejoin: "round",
      strokeWidth: "3" }),

    React.createElement("circle", {
      cx: "54.4",
      cy: "38.8",
      r: "18.7",
      fill: "#fff",
      stroke: "#453d84",
      strokeLinejoin: "round",
      strokeWidth: "3" }),

    React.createElement("path", {
      fill: "#fff",
      stroke: "#453d84",
      strokeLinejoin: "round",
      strokeWidth: "3",
      d: "M139.2 31.1a22.9 22.9 0 11-34.6-29.2h3.5a82.1 82.1 0 0131.4 6.2h0a23 23 0 01-.3 23zM190.4 84.6v11.2a30.7 30.7 0 01-6.9 19.4 39.8 39.8 0 11-8.6-78.7 82.5 82.5 0 0115.5 48.1zM34.1 104.9a28.7 28.7 0 01-21.7 12.5 45.3 45.3 0 01-4.2-3.6 30.7 30.7 0 01-6.7-21l.5-7.5a85.7 85.7 0 015.3-25.1 28.7 28.7 0 0126.8 44.7z" }),

    React.createElement("path", {
      fill: "#e8ebef",
      d: "M113.7 102.3a25.7 25.7 0 01-35.2 8.8l-2.7-1.9a25.6 25.6 0 0026.1-43.6l3 1.5a25.6 25.6 0 018.8 35.2zM139.2 30.7a23.9 23.9 0 01-32.8 8.2l-2.5-1.8a23.9 23.9 0 0030.9-32.4l4.9 2.3c4.6 7.3 4.3 15.7-.5 23.7zM36.6 104.8c-5.6 9.4-13.9 14.3-24.1 14l-3.7-3.9a29.2 29.2 0 0014.4-51.8l3.4 1.7a29.2 29.2 0 0110 40zM70.5 48.8A19.6 19.6 0 0144 55.3l-2.1-1.4a19.6 19.6 0 0024.3-7.6 18.7 18.7 0 00-4.6-24.6l2.2 1.1a18.7 18.7 0 016.7 26zM188.5 101.4l-1.9 6.1-3.5 6.1a40 40 0 01-29.3-4.8 41.1 41.1 0 01-4.3-2.9 38.6 38.6 0 0039-4.5z",
      style: { mixBlendMode: "darken" } }),

    React.createElement("g", { fill: "#453d84" },
    React.createElement("rect", {
      width: "6.6",
      height: "11.49",
      x: "80.6",
      y: "139.7",
      rx: "2.7",
      ry: "2.7" }),

    React.createElement("rect", {
      width: "6.6",
      height: "11.49",
      x: "107.5",
      y: "139.7",
      rx: "2.7",
      ry: "2.7" }))),



    React.createElement("g", { "data-name": "Mushroom" },
    React.createElement("rect", {
      width: "70",
      height: "37.73",
      x: "168.9",
      y: "160.5",
      fill: "#ffe7cd",
      stroke: "#453d84",
      strokeMiterlimit: "10",
      strokeWidth: "3",
      rx: "14.3",
      ry: "14.3",
      transform: "rotate(-.2 257.43 229.633)" }),

    React.createElement("path", {
      fill: "#e7ccff",
      stroke: "#453d84",
      strokeMiterlimit: "10",
      strokeWidth: "3",
      d: "M258.6 145.7v6.6a18.3 18.3 0 01-17.8 18.6l-74.4 1.5a18.3 18.3 0 01-18.4-17.8v-4.5a50.6 50.6 0 012-15 51.4 51.4 0 0148.2-37.2l10.5-.2a48.5 48.5 0 0118.6 3.3h0a49.5 49.5 0 0121.7 16.5 48.7 48.7 0 019.6 28.2z" }),

    React.createElement("path", {
      fill: "#ffe7cd",
      d: "M238.3 173.1c.5.5.6 8 .6 8a16.9 16.9 0 01-16.8 17l-36.1.2a16.7 16.7 0 01-15.8-10.1 16.5 16.5 0 0012.3 4.9l36.1-.2a17 17 0 0016.9-17.1v-2.6h2.7z", style: { mixBlendMode: "multiply" } }),

    React.createElement("path", {
      fill: "#e7ccff",
      d: "M258.8 149.1v5.9a15 15 0 01-3.9 10.2 19.1 19.1 0 01-14 6.3l-74.3 1.5a19.2 19.2 0 01-13.6-5.1c-1.6-1.6 2.7-2.8 6.5-2.8l74.4-1.5a19.1 19.1 0 0014-6.3 15 15 0 003.9-10.2v-5.9a39.6 39.6 0 00-7.3-22.1 45.4 45.4 0 014.8 4.9 40.1 40.1 0 019.5 25.1z", style: { mixBlendMode: "multiply" } }),

    React.createElement("path", {
      fill: "#e7ccff",
      d: "M214.8 107.8l-10 .2a49.2 49.2 0 00-47.7 50.2v4.3a17.4 17.4 0 001.1 5.7 17.6 17.6 0 01-7.9-14.3v-4.3c-.1-5-.1-9.7 1.2-14.3A49.9 49.9 0 01198 99.4l10-.2a45.8 45.8 0 0117.7 3.2c8.3 3.2-4.6 5.3-10.9 5.4z", style: { mixBlendMode: "overlay" } }),

    React.createElement("path", {
      fill: "#fff",
      d: "M182.3 141.1a15.8 15.8 0 1113.7-7.9 15.8 15.8 0 01-13.7 7.9z" }),

    React.createElement("path", {
      fill: "#453d84",
      d: "M182.4 111.1a14.3 14.3 0 11-12.4 7.2 14.2 14.2 0 0112.4-7.2m0-3a17.3 17.3 0 108.6 2.3 17.3 17.3 0 00-8.6-2.3z" }),

    React.createElement("path", {
      fill: "#e8ebef",
      d: "M195 133a14.3 14.3 0 01-19.5 5.3l-1.5-1a14.3 14.3 0 0014-24.6l1.7.8A14.3 14.3 0 01195 133z",
      style: { mixBlendMode: "darken" } }),

    React.createElement("path", {
      fill: "#fff",
      d: "M215.3 122.1a13.4 13.4 0 01-8.9-23.5 1.5 1.5 0 011-.4h2.6a44.2 44.2 0 0116.1 3 1.5 1.5 0 01.8.7 13.4 13.4 0 01-11.6 20.2z" }),

    React.createElement("path", {
      fill: "#453d84",
      d: "M210.1 99.7a42.7 42.7 0 0115.5 2.9 11.9 11.9 0 11-18.2-2.9h2.7m0-3h-2.7a3 3 0 00-1.9.8 14.9 14.9 0 1022.8 3.6 3 3 0 00-1.6-1.3 45.6 45.6 0 00-16.5-3.1z" }),

    React.createElement("path", {
      fill: "#e8ebef",
      d: "M225.7 113.4a12.4 12.4 0 01-17 4.6l-1.3-.9a12.4 12.4 0 0015.8-17.2l2.2.5a12.4 12.4 0 01.3 13z",
      style: { mixBlendMode: "darken" } }),

    React.createElement("g", null,
    React.createElement("path", {
      fill: "#fff",
      d: "M156.8 169.5l-.8-.2-2.5-1.8h-.1a17.7 17.7 0 01-4.8-11.8v-4a46.9 46.9 0 011.8-13.9 1.5 1.5 0 011.2-1.1l3.1-.3a16.7 16.7 0 018.3 2.2 16.7 16.7 0 01-5.8 31h-.2z" }),

    React.createElement("path", {
      fill: "#453d84",
      d: "M154.5 137.8a15.2 15.2 0 012.3 30.2l-2.3-1.7a16.2 16.2 0 01-4.4-10.8v-4a45.4 45.4 0 011.8-13.5l2.8-.3m0-3a18.2 18.2 0 00-3.4.3 3 3 0 00-2.3 2.1 48.4 48.4 0 00-1.9 14.4v4a19.2 19.2 0 005.2 12.8l.3.3 2.6 1.9a3 3 0 001.6.5h.4a18.2 18.2 0 00-2.7-36.2z" }),

    React.createElement("g", { style: { mixBlendMode: "darken" } },
    React.createElement("path", {
      fill: "#e8ebef",
      d: "M168 160.4a15.4 15.4 0 01-13.6 7.8l-1.1-2.1a15.4 15.4 0 007.1-27.6l1.8.9a15.4 15.4 0 015.8 21z",
      style: { mixBlendMode: "darken" } }))),



    React.createElement("g", null,
    React.createElement("path", {
      fill: "#fff",
      d: "M203.4 167.2a10.9 10.9 0 119.5-5.5 10.9 10.9 0 01-9.5 5.5z" }),

    React.createElement("path", {
      fill: "#453d84",
      d: "M203.4 146.9a9.4 9.4 0 11-8.1 4.7 9.3 9.3 0 018.1-4.7m0-3.2a12.5 12.5 0 106.2 1.7 12.6 12.6 0 00-6.2-1.7z" }),

    React.createElement("g", { style: { mixBlendMode: "darken" } },
    React.createElement("path", {
      fill: "#e8ebef",
      d: "M211.5 161.1a9.8 9.8 0 01-13.2 3.5l-1-.7a9.8 9.8 0 0012.1-4.1 9.4 9.4 0 00-2.5-12.3l1.1.5a9.4 9.4 0 013.5 13.1z",
      style: { mixBlendMode: "darken" } }))),



    React.createElement("g", null,
    React.createElement("path", {
      fill: "#fff",
      d: "M248 166a24.1 24.1 0 01-.7-48.2 1.5 1.5 0 011.2.6 48.3 48.3 0 019.6 28.1v6.3a19 19 0 01-4 12 1.5 1.5 0 01-.8.5 24.2 24.2 0 01-5.3.7z" }),

    React.createElement("path", {
      fill: "#453d84",
      d: "M247.3 119.3a46.9 46.9 0 019.4 27.2v6.3a17.4 17.4 0 01-3.7 11.1 22.6 22.6 0 11-5.8-44.6m0-3h-.1a25.6 25.6 0 00.8 51.2 25.7 25.7 0 005.8-.7 3 3 0 001.7-1.1 20.5 20.5 0 004.3-13v-6.3a49.8 49.8 0 00-9.9-28.9 3 3 0 00-2.4-1.2z" }),

    React.createElement("g", { style: { mixBlendMode: "darken" } },
    React.createElement("path", {
      fill: "#e8ebef",
      d: "M256.7 156.7v3.9l-3.4 3.1a22.7 22.7 0 01-16.7-2.4l-2.5-1.6a22.8 22.8 0 0022.6-3z",
      style: { mixBlendMode: "darken" } }))),



    React.createElement("g", { fill: "#453d84" },
    React.createElement("rect", {
      width: "3.9",
      height: "6.79",
      x: "194.5",
      y: "179.6",
      rx: "1.5",
      ry: "1.5",
      transform: "rotate(-1.2 189.129 178.656)" }),

    React.createElement("rect", {
      width: "3.9",
      height: "6.79",
      x: "210.4",
      y: "179.2",
      rx: "1.5",
      ry: "1.5",
      transform: "rotate(-1.2 203.502 174.031)" })))))));







}

function Balloons() {
  return (
    React.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 264.5 321.8" },
    React.createElement("g", { "data-name": "Layer 1" },
    React.createElement("g", null,
    React.createElement("path", {
      fill: "#cce8fe",
      stroke: "#453d84",
      strokeLinejoin: "round",
      strokeWidth: "3.31",
      d: "M83.6 51.9l-.3.3v-.3z" }),

    React.createElement("path", {
      fill: "#cce8fe",
      stroke: "#453d84",
      strokeLinejoin: "round",
      strokeWidth: "3",
      d: "M83.6 51.9l-.3.3v-.3z" }),

    React.createElement("path", {
      fill: "none",
      stroke: "#453d84",
      strokeLinecap: "round",
      strokeMiterlimit: "10",
      strokeWidth: "3",
      d: "M153.4 120.7c0 26-7.2 58-4 94.2 2.7 31.4 1.3 39.8-17.1 60.2-12.5 13.9-2.3 34.5-10.6 45.2" }),

    React.createElement("path", {
      fill: "#ffcbe9",
      stroke: "#453d84",
      strokeMiterlimit: "10",
      strokeWidth: "3",
      d: "M147.7 118.7l2.4-2.1a1.6 1.6 0 012.7.9l.6 3.2.6 3.2a1.6 1.6 0 01-2.1 1.9l-3.1-1-3.1-1a1.6 1.6 0 01-.5-2.8z" }),

    React.createElement("path", {
      fill: "#ffcdff",
      d: "M156.3 120.8a14 14 0 01-4.2-.5c-13.7-4.3-40.9-44.4-30.1-78.8 6.6-21 26.3-35.1 49-35.1a54.4 54.4 0 0148.3 29.7 47.4 47.4 0 012.7 37.1c-6.1 17.4-20.3 28.9-31.1 35.5-13.7 8.4-27.3 12.1-34.6 12.1z" }),

    React.createElement("path", {
      fill: "#453d84",
      d: "M171 7.9a52.5 52.5 0 0115.9 2.5c26.8 8.5 42.7 36.7 33.7 62.3-10.6 30.4-49.2 46.6-64.3 46.6a12.6 12.6 0 01-3.7-.5c-13.4-4.2-39.6-43.9-29.2-76.8C130 21.2 149.6 8 171 8m0-3c-23.3 0-43.6 14.5-50.4 36.1s.8 41 5.8 51.4c7 14.7 17.4 26.7 25.3 29.2a15.5 15.5 0 004.6.6c7.6 0 21.4-3.8 35.4-12.3 11.1-6.7 25.5-18.5 31.8-36.3a48.9 48.9 0 00-2.7-38.3A55.9 55.9 0 00171 4.9z" }),

    React.createElement("path", {
      fill: "#ffcdff",
      d: "M220.6 72.8c-11.7 33.4-57 49.6-68 46.1-3.2-1-7.2-4.1-11.3-8.7a17.4 17.4 0 005.1 2.8c11 3.5 56.3-12.7 68-46.1 5.8-16.7 1.2-34.4-10.1-47.1 15.7 12.7 23.1 33.5 16.3 53z",
      style: { mixBlendMode: "multiply" } }),

    React.createElement("path", {
      fill: "#ffcdff",
      d: "M211 26.3a53.1 53.1 0 00-16.2-8.4c-26.8-8.5-55.2 5.6-63.4 31.6s4.7 52.7 17.1 67.3c-13.9-9.5-34.5-44.9-25-74.8 8.2-25.9 36.6-40.1 63.4-31.6A52.9 52.9 0 01211 26.3z", style: { mixBlendMode: "overlay" } }),

    React.createElement("path", {
      fill: "none",
      stroke: "#453d84",
      strokeLinecap: "round",
      strokeMiterlimit: "10",
      strokeWidth: "3",
      d: "M180.5 194.1c-10.7 45.6-32.8 69.3-48.2 81-8.2 6.2-8.5 18.9-22.3 29.7" }),

    React.createElement("path", {
      fill: "#cff",
      stroke: "#453d84",
      strokeMiterlimit: "10",
      strokeWidth: "3",
      d: "M177.5 197.7l2.8-1.6a1.6 1.6 0 012.4 1.4v6.5a1.6 1.6 0 01-2.5 1.4l-2.8-1.6-2.8-1.6a1.6 1.6 0 010-2.8z" }),

    React.createElement("path", {
      fill: "#cff",
      d: "M190.1 201.3c-4 0-7.2-.5-9.3-1.6-7-3.6-15.1-16.7-19.5-32-3.2-10.9-7-31.9 2.4-50.6 8.6-17 26-27.5 45.5-27.5a54.3 54.3 0 0151.5 37.7 47.4 47.4 0 01-3.3 37.1c-13.8 25.4-47.6 36.9-67.3 36.9z" }),

    React.createElement("path", {
      fill: "#453d84",
      d: "M209.3 91.2a52.1 52.1 0 0123.5 5.6c25.1 12.7 36.3 43 23.3 66.9-13.9 25.6-48.4 36.1-65.9 36.1-3.8 0-6.8-.5-8.6-1.4-12.5-6.3-32-49.7-16.4-80.5 8.6-17 25.9-26.7 44.1-26.7m0-3c-20.1 0-38 10.8-46.8 28.3-9.7 19.2-5.7 40.6-2.5 51.7 4.5 15.6 12.9 29.2 20.3 32.9 2.3 1.1 5.6 1.7 9.9 1.7 8.1 0 21.7-2.3 35.6-8.7 10.5-4.9 24.8-13.9 33-28.9a48.9 48.9 0 003.5-38.2 55.8 55.8 0 00-52.9-38.8z" }),

    React.createElement("path", {
      fill: "#cff",
      d: "M256.1 163.8c-16.9 31.1-64.2 39.9-74.5 34.7-3-1.5-6.5-5.2-9.7-10.4a17.4 17.4 0 004.5 3.6c10.3 5.2 57.6-3.5 74.5-34.7 8.4-15.5 6.7-33.8-2.5-48.1 13.6 15 17.6 36.8 7.7 54.9z",
      style: { mixBlendMode: "multiply" } }),

    React.createElement("g", { style: { mixBlendMode: "overlay" } },
    React.createElement("path", {
      fill: "#cff",
      d: "M254.1 116.4a53.1 53.1 0 00-14.7-10.9c-25.1-12.7-55.4-3.3-67.7 21s-3.8 52.8 6.1 69.2c-12.2-11.6-26.9-49.9-12.8-77.8 12.3-24.3 42.5-33.7 67.7-21a52.9 52.9 0 0121.4 19.5z" })),


    React.createElement("g", null,
    React.createElement("path", {
      fill: "none",
      stroke: "#453d84",
      strokeLinecap: "round",
      strokeMiterlimit: "10",
      strokeWidth: "3",
      d: "M105.3 114.9c8.7 47.4-18.1 56.6-12.3 88.8 4.9 27.3 59.1 92.4 49.9 112.7" }),

    React.createElement("path", {
      fill: "#cce8fe",
      stroke: "#453d84",
      strokeMiterlimit: "10",
      strokeWidth: "3",
      d: "M102.3 117.9l1-3.1a1.6 1.6 0 012.8-.6l2.2 2.4 2.2 2.4a1.6 1.6 0 01-.9 2.7l-3.2.7-3.2.7a1.6 1.6 0 01-1.9-2.1z" }),

    React.createElement("path", {
      fill: "#cce8fe",
      d: "M105.6 117.5c-15.1 0-54.7-21.7-60.8-55.9a49.6 49.6 0 018.8-38.1A53 53 0 0187.4 2.4a55 55 0 019.7-.9c25.5 0 47.3 17.9 50.9 41.6 5.4 35.9-27.7 72-39.9 74.2z" }),

    React.createElement("path", {
      fill: "#453d84",
      d: "M97.1 3c24.1 0 45.8 16.5 49.4 40.3 5.2 35-27.3 70.5-38.7 72.5l-2.2.2c-15.5 0-53.5-22.3-59.3-54.6C41.4 34.6 60 8.8 87.7 3.8a53.4 53.4 0 019.4-.8m0-3a56.6 56.6 0 00-10 .9 54.5 54.5 0 00-34.8 21.8 51.1 51.1 0 00-9 39.2c2.7 14.9 12.3 29.5 27.1 41.3 12 9.5 26.1 15.8 35.2 15.8l2.8-.2c7.2-1.3 18.8-11.9 27.5-25.2 6.4-9.8 16.8-29.3 13.6-50.7a48.9 48.9 0 00-18.1-31A55.1 55.1 0 0097.1 0z" }),

    React.createElement("path", {
      fill: "#cce8fe",
      d: "M146.6 43.3c5.2 35-27.3 70.5-38.7 72.5-3.3.6-8.3-.3-14-2.5a17.4 17.4 0 005.8.1c11.4-2.1 43.9-37.5 38.7-72.5-2.6-17.5-15-31-30.9-37 19.7 4 36.1 19 39.1 39.4z",
      style: { mixBlendMode: "multiply" } }),

    React.createElement("g", { style: { mixBlendMode: "overlay" } },
    React.createElement("path", {
      fill: "#cce8fe",
      d: "M116.4 6.7a53.1 53.1 0 00-18.3.1c-27.7 5-46.2 30.7-41.4 57.5s28.8 44.4 46.5 51.6c-16.7-2-51.5-23.7-57-54.5C41.4 34.6 60 8.8 87.6 3.8a52.9 52.9 0 0128.8 2.9z" }))),



    React.createElement("g", null,
    React.createElement("path", {
      fill: "none",
      stroke: "#453d84",
      strokeLinecap: "round",
      strokeMiterlimit: "10",
      strokeWidth: "3",
      d: "M69.3 189.5c10.1 47.2 29 67.6 45.3 77.3 12.9 7.7 19.2 6.5 25.3 19.5 7.9 16.6 13 9.7 17.2 20" }),

    React.createElement("path", {
      fill: "#ffffcd",
      stroke: "#453d84",
      strokeMiterlimit: "10",
      strokeWidth: "3",
      d: "M66.5 191.5l1.3-3a1.6 1.6 0 012.8-.3l1.9 2.6 1.9 2.6a1.6 1.6 0 01-1.1 2.6l-3.2.4-3.2.4a1.6 1.6 0 01-1.7-2.3z" }),

    React.createElement("path", {
      fill: "#ffffcd",
      d: "M67.2 191.2c-17.6 0-55.2-19-63.9-50a49.6 49.6 0 015.1-38.7 53 53 0 0131.8-24.2 54.7 54.7 0 0114.8-2c23.7 0 44.1 15.1 49.4 36.8 8.7 35.2-20.8 74.3-32.7 77.7a16.6 16.6 0 01-4.5.4z" }),

    React.createElement("path", {
      fill: "#453d84",
      d: "M54.9 77.7c22.2 0 42.6 13.9 48 35.7 8.5 34.4-20.5 72.7-31.7 75.8a15.1 15.1 0 01-4 .5c-16.6 0-53.9-18.4-62.4-48.9-7.3-26.2 8.7-53.6 35.8-61.2a53.2 53.2 0 0114.4-2m0-3a56.3 56.3 0 00-15.2 2.1 54.5 54.5 0 00-32.6 25 51.1 51.1 0 00-5.3 39.9c8.9 31.7 47.3 51.1 65.3 51.1a18 18 0 004.8-.6c7-2 17.6-13.6 25-27.7 5.5-10.3 13.9-30.8 8.7-51.8s-26.5-38-50.9-38z" }),

    React.createElement("path", {
      fill: "#ffffcd",
      d: "M103 113.4c8.5 34.4-20.5 72.7-31.7 75.9-3.3.9-8.3.5-14.2-1.1a17.4 17.4 0 005.8-.4c11.1-3.1 40.2-41.5 31.7-75.8-4.3-17.3-17.9-29.6-34.3-34C80.4 80 98 93.4 103 113.4z",
      style: { mixBlendMode: "multiply" } }),

    React.createElement("path", {
      fill: "#ffffcd",
      d: "M69.5 79.8a53.1 53.1 0 00-18.2 1.8c-27.1 7.6-43.1 35-35.8 61.2s32.8 41.5 51.2 47c-16.8-.4-53.5-18.7-61.9-48.9-7.3-26.2 8.7-53.6 35.8-61.2a52.9 52.9 0 0128.9.1z", style: { mixBlendMode: "overlay" } })),


    React.createElement("g", null,
    React.createElement("path", {
      fill: "none",
      stroke: "#453d84",
      strokeLinecap: "round",
      strokeMiterlimit: "10",
      strokeWidth: "3",
      d: "M133.6 207.9c-24.6 41.5-1.3 50.3 0 72.6.9 15-4.5 14.6-3 36.9" }),

    React.createElement("path", {
      fill: "#e7ccff",
      stroke: "#453d84",
      strokeMiterlimit: "10",
      strokeWidth: "3.13",
      d: "M129.3 209.5l1.6-2.8a1.6 1.6 0 012.8 0l1.6 2.8 1.6 2.8a1.6 1.6 0 01-1.4 2.4H129a1.6 1.6 0 01-1.4-2.5z" }),

    React.createElement("path", {
      fill: "#e7ccff",
      d: "M131.7 209.2h-.5c-7.9-.4-20.5-9.3-30.7-21.5-7.2-8.7-19.2-26.4-18.1-47.3 1.5-26.9 24.4-47.9 52.1-47.9h3a54.2 54.2 0 0137.8 18.3 47.4 47.4 0 0111.8 35.3c-1.8 20.8-15.8 37-24 44.9-11 10.5-24.2 18.2-31.4 18.2z" }),

    React.createElement("path", {
      fill: "#453d84",
      d: "M134.6 94h2.9c28.1 1.5 50.5 24.9 48.2 52-3 34.9-41.9 61.6-54 61.6h-.4c-13.9-.8-49.2-32.7-47.3-67.2 1.4-26.1 23.8-46.4 50.6-46.4m0-3C106 91 82.5 112.7 81 140.3c-1.2 21.4 11 39.5 18.4 48.3 10.4 12.5 23.5 21.6 31.7 22h.6c7.5 0 21.1-7.8 32.5-18.6 8.4-8 22.7-24.5 24.5-45.8a48.9 48.9 0 00-12.2-36.4A55.7 55.7 0 00137.7 91h-3.1z" }),

    React.createElement("path", {
      fill: "#e7ccff",
      d: "M185.8 146.1c-3 35.3-42.8 62.3-54.4 61.6-3.4-.2-8-2.2-13.1-5.7a17.4 17.4 0 005.6 1.5c11.5.6 51.4-26.4 54.4-61.6 1.5-17.6-7.4-33.6-21.6-43.1 18.4 8.4 30.8 26.8 29.1 47.3z",
      style: { mixBlendMode: "multiply" } }),

    React.createElement("g", { style: { mixBlendMode: "overlay" } },
    React.createElement("path", {
      fill: "#e7ccff",
      d: "M164.9 103.4a53.1 53.1 0 00-17.8-4.1C119 97.8 95 118.6 93.5 145.7s17.7 49.9 33.4 60.9c-15.8-5.8-44.6-34.9-42.9-66.2 1.5-27.2 25.5-47.9 53.6-46.4a52.9 52.9 0 0127.3 9.4z" }))),



    React.createElement("path", {
      fill: "none",
      stroke: "#453d84",
      strokeMiterlimit: "10",
      strokeWidth: "3",
      d: "M132.5 276.4s-2.8 3.2-5.7 2.9-5.2-2-5-3.9 2.7-2.2 5.6-1.9a8.7 8.7 0 015.1 2.9zM138.5 277c-2.8 1-6-.7-6-.7s1.2-4 4-4.9 5.6-.3 6.2 1.4-1.3 3.3-4.2 4.2z" })))));





}









ReactDOM.render(React.createElement(App, null), document.getElementById("app"));