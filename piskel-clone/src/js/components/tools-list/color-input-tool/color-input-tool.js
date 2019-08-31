const colorInputTool = {
  setEvents() {
    const colourInputOne = document.getElementById('colour-input-one');
    const colourInputTwo = document.getElementById('colour-input-two');
    const colourInputSwap = document.getElementById('colour-input-swap');

    colourInputOne.addEventListener('change', colorInputTool.colourInputHandler);
    colourInputTwo.addEventListener('change', colorInputTool.colourInputHandler);
    colourInputSwap.addEventListener('click', colorInputTool.colourInputSwapHandler);
  },
  colourInputHandler(e) {
    const parent = e.target.parentElement;
    parent.style.backgroundColor = e.target.value;
  },
  colourInputSwapHandler() {
    const currentColour = document.getElementById('current-colour');
    const secondColour = document.getElementById('second-colour');
    const temp = getComputedStyle(currentColour).backgroundColor;
    currentColour.style.backgroundColor = getComputedStyle(secondColour).backgroundColor;
    // colour = getComputedStyle(currentColour).background;
    secondColour.style.backgroundColor = temp;
  },
};

export default colorInputTool;
