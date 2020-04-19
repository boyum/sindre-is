  const cellsPerRow = 10;
  const modes = {
    OPENING_CELLS: 'Opening cells',
    CLOSING_CELLS: 'Closing cells',
  };

  let remainingLives = 3;
  let size;
  let horizontalPadding;
  let verticalPadding;
  let array;
  let horizontalGroups = [];
  let verticalGroups = [];
  let mode = modes.OPENING_CELLS;
  let modeButton;

  function setup() {
    let canvasSize = Math.min(displayWidth, displayHeight);
    const canvas = createCanvas(canvasSize, canvasSize);
    canvas.parent('canvas-container');
    horizontalPadding = width / cellsPerRow;
    verticalPadding = height / cellsPerRow;
    size = ((width - horizontalPadding * 4) / cellsPerRow);
    array = initNonogram();

    for (let i = 0; i < cellsPerRow; i++) {
      const row = array.slice(i * cellsPerRow, (i + 1) * cellsPerRow, cellsPerRow);
      horizontalGroups.push(findGroups(row));

      const column = array.filter((_, index) => index % cellsPerRow === i);
      verticalGroups.push(findGroups(column));
    }

    modeButton = createButton(`Mode: ${mode}`);
    modeButton.position(19, 19);
    modeButton.mousePressed(toggleMode);
    modeButton.parent('canvas-container');
  }

  function drawHorizontalNumbers() {
    fill('#333');

    horizontalGroups.forEach((group) => {
      const numberOfGroups = group.length;
      const xCoord = array[0].xPosition - 10 * numberOfGroups;

      group.forEach((g, index) => {
        const yCoord = g[0].yPosition + size / 2;
        text(g.length, xCoord + index * 10, yCoord);
      });
    });
  }

  function drawVerticalNumbers() {
    fill('#333');

    verticalGroups.forEach((group) => {
      const numberOfGroups = group.length;
      const yCoord = array[0].yPosition - 15 * numberOfGroups;
      group.forEach((g, index) => {
        const xCoord = g[0].xPosition + size / 2;
        text(g.length, xCoord, yCoord + index * 15);
      });
    });
  }

  function draw() {
    background(250);
    drawNonogram();
    drawHorizontalNumbers();
    drawVerticalNumbers();

    printLives();
  }

  /* prevents the mobile browser from processing some default
   * touch events, like swiping left for "back" or scrolling
   * the page.
   */
  function touchStarted(event) {
    onClick(event);
    return false;
  }

  function touchMoved() {
    return false;
  }

  function touchEnded() {
    return false;
  }

  function onClick(event) {
    const {
      offsetX,
      offsetY
    } = event;

    const cell = findCell(offsetX, offsetY);
    if (!cell) {
      return;
    }

    clickCell(cell);
    drawCell(cell);
  }

  function mouseStarted(event) {
    onClick(event);
  }

  function clickCell(cell) {
    if (cell.clicked) {
      return;
    }

    cell.clicked = true;

    if (cell.filled) {
      clickFilledCell(cell);
    } else {
      clickEmptyCell(cell);
    }
  }

  function clickFilledCell(cell) {
    cell.color = getCellColor(cell.filled, cell.clicked);

    if (mode === modes.CLOSING_CELLS) {
      loseLife();
    }
  }

  function clickEmptyCell(cell) {
    cell.color = getCellColor(cell.filled, cell.clicked);

    if (mode === modes.OPENING_CELLS) {
      loseLife();
    }
  }

  function toggleMode() {
    mode = mode === modes.OPENING_CELLS ? modes.CLOSING_CELLS : modes.OPENING_CELLS;
    modeButton.elt.innerText = `Mode: ${mode}`;
  }

  function loseLife() {
    remainingLives--;

    if (remainingLives < 1) {
      die();
    }
  }

  function die() {

  }

  function printLives() {
    fill('#333');
    text(`Remaining lives: ${remainingLives}`, 10, 10);
  }

  function initNonogram() {
    const ret = [];

    for (let y = 0; y < cellsPerRow; y++) {
      for (let x = 0; x < cellsPerRow; x++) {
        const xPosition = size * x + horizontalPadding;
        const yPosition = size * y + verticalPadding;

        const filled = random([true, false]);

        ret.push({
          xPosition,
          yPosition,
          filled,
          clicked: false,
          color: getCellColor(filled, false),
        });
      }
    }

    return ret;
  }

  function getCellColor(filled, clicked) {
    return clicked ? filled ? '#498467' : '#C17C74' : '#F2F2F2'
  }

  function drawNonogram() {
    array.forEach(drawCell);
  }

  function drawCell(cell) {
    fill(cell.color);
    //stroke(cell.filled && cell.clicked ? cell.color : '#777');
    stroke('#fff');
    rect(cell.xPosition, cell.yPosition, size, size);
  }

  function findCell(x, y) {
    return array.find(cell => (cell.xPosition <= x && cell.xPosition + size > x) && (cell.yPosition <= y && cell.yPosition + size > y));
  }

  function findGroups(cells) {
    const groups = [];
    let group;
    cells.reduce((prevCell, thisCell) => {
      if (thisCell.filled) {
        if (!group) {
          group = [thisCell];
        } else if (prevCell.filled) {
          group.push(thisCell);
        } else {
          groups.push(group);
          group = [thisCell];
        }
      }

      return thisCell;
    }, {});

    if (group) groups.push(group);

    return groups;
  }