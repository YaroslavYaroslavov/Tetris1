  const elementField = document.querySelector('.field');
  const elementClearButton = document.querySelector('.clearButton')
  const elementRandomButton = document.querySelector('.randomButton')
  const elementNextFrameButton = document.querySelector('.nextFrameButton')
  const elementMoveLeft = document.querySelector('.moveLeft')
  const elementMoveRight = document.querySelector('.moveRight')
  const elementStartGame = document.querySelector('.startButton')
  let Field = [];
  let currentFigure = 'T';

  function clearField() {
      Field = [
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], //0
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], //1
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], //2 
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], //3 
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], //4
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], //5 
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], //6
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], //7
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], //8
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], //9
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], //10
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], //11
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], //12
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
      ]; //13
      spawnField();
  }

  function deleteFullString(curString) {
      curColumn = 9
      while (curColumn >= 0) {
          Field[curString][curColumn] = 0
          curColumn--
      }
      dropElements(curString)
  }

  function dropElements(lastString) {
      let curString = lastString
      let curColumn = 0;


      while (curString != 0) {
          curColumn = 9
          while (curColumn >= 0) {
              Field[curString][curColumn] = Field[curString - 1][curColumn]
              curColumn--
          }
          curString--
      }
  }

  function checkFullString() {
      let curString = 16
      let curColumn = 0;
      let lastString = 0

      while (curString != 0) {
          curColumn = 9
          let fullString = true
          while (curColumn >= 0) {

              if (Field[curString][curColumn] != 11) {
                  fullString = false
                  break
              }
              curColumn--
          }
          if (fullString) {
              lastString = curString;
              deleteFullString(curString)

          }
          curString--

      }
  }

  function getRandomElement() {
      let el = Math.floor(Math.random() * 7)
      switch (el) {
          case 0:
              el = [
                      [1],
                      [1],
                      [1],
                      [1]
                  ] // I
              currentFigure = 'I'
              console.log('I')
              return el;
          case 1:
              el = [
                      [1, 1, 1],
                      [0, 0, 1]
                  ] // J
              console.log('J')
              currentFigure = 'J'
              return el;
          case 2:
              el = [
                      [0, 0, 1],
                      [1, 1, 1]
                  ] // L
              console.log('L')
              currentFigure = 'L'
              return el;
          case 3:
              el = [
                      [1, 1],
                      [1, 1]
                  ] // O
              console.log('O')
              currentFigure = 'O'
              return el;
          case 4:
              el = [
                      [0, 1, 1],
                      [1, 1, 0]
                  ] //S
              console.log('S')
              currentFigure = 'S'
              return el;
          case 5:
              el = [
                      [1, 1, 1],
                      [0, 1, 0]
                  ] // T
              console.log('T')
              currentFigure = 'T'
              return el;
          case 6:
              el = [
                      [1, 1, 0],
                      [0, 1, 1]
                  ] // Z
              console.log('Z')
              currentFigure = 'Z'
              return el;
          default:
              getRandomElement();

      }
  }


  function drawRandomElement(el) {
      el = getRandomElement();
      let string = 0;
      let r = Math.floor(Math.random() * 8)
      let column = r;
      el.forEach(str => {
          let length = str.length
          str.forEach(col => {
              Field[string][column] = col
              if (length - 1 > 0) {
                  column++
                  length--;
              }
          })
          column = r
          string++
      })
      drawField();
  }


  function spawnField() {

      elementField.innerHTML = ''
      let id = 0
      Field.forEach(element => {
          element.forEach(el => {
              elementField.innerHTML += `<div class="color_${el}" id="${id}" style="display: inline">${el}</div>` //ЕТА ХУЙНЯ ЛОМАЕТ БРАУЗЕР
              elementField.innerHTML += "";
              id++
          })
          elementField.innerHTML += "<br>"
      });
  }

  function drawField() {
      let id = 0
      Field.forEach(element => {
          element.forEach(el => {
              let pixel = document.getElementById(`${id}`)
              pixel.textContent = el
              pixel.className = `color_${el}`

              id++
          })

      });

  }

  function pinANZ() {
      let curString = 16
      while (curString != 0) {
          let curColumn = 9
          while (curColumn >= 0) {
              if (Field[3][curColumn] == 11) {
                  alert('ПРОЕБАЛ')
                  clearField()
                  return
              }

              if ((Field[curString][curColumn] == 1 || Field[curString][curColumn] == 9) && Field[curString][curColumn] != 0) {
                  Field[curString][curColumn] = Field[curString][curColumn] * 11
                  if (Field[curString][curColumn] == 99) {
                      Field[curString][curColumn] = 0
                  }
              }
              curColumn--
          }
          curString--

      }
      checkFullString()
      drawField()
      drawRandomElement()
  }

  function trueFall(canFall) {
      if (!canFall) {
          pinANZ();
          console.log('Я ВЫРУБИЛ')
          return
      }
      let curString = 16
      while (curString >= 0) {
          let curColumn = 9
          while (curColumn >= 0) {

              if (Field[curString][curColumn] == 1 && curString == 16) {
                  pinANZ();

                  console.log('Я ВЫРУБИЛ1')
                  return

              }
              if (Field[curString][curColumn] == 1) {
                  Field[curString + 1][curColumn] = 1;
                  Field[curString][curColumn] = 0
              }


              curColumn--
          }

          curString--

      }
  }

  function fall() {

      let curString = 15
      let canFall = true
      let curColumn = 0;


      while (curString != 0) {
          curColumn = 9
          while (curColumn >= 0) {
              if (Field[curString + 1][curColumn] === undefined || (Field[curString][curColumn] == 1 && Field[curString + 1][curColumn] == 11)) {
                  canFall = false
                  break
              }

              curColumn--
          }
          if (canFall == false) {
              break
          }
          curString--


      }

      trueFall(canFall)

      drawField()
      console.log(canFall)
  }

  function trueMoveLeft(canMoveLeft) {
      if (!canMoveLeft) {
          console.log('нельзя двигаться влево')
          return
      }
      let curString = 16
      while (curString >= 0) {
          let curColumn = 0
          while (curColumn <= 9) {
              //   console.log(Field[curString][curColumn])
              if (Field[curString][curColumn] == 1 && Field[curString][curColumn - 1] == 0) {
                  console.log('wtf')
                  Field[curString][curColumn - 1] = 1;
                  Field[curString][curColumn] = 0
              }


              curColumn++
          }

          curString--

      }

  }

  function moveLeft() {
      let curString = 16
      let canMoveLeft = true
      let curColumn = 0;


      while (curString != 0) {
          curColumn = 9
          while (curColumn >= 0) {
              if ((Field[curString][curColumn] == 1 && Field[curString][curColumn - 1] == 11)) {
                  canMoveLeft = false
                  console.log('Я ПАЛАМАЛ')
                  break
              }

              if (Field[curString][curColumn] == 1 && curColumn == 0) {
                  canMoveLeft = false
                  console.log('Сломал')
                  break

              }

              curColumn--
          }
          if (canMoveLeft == false) {
              break
          }
          curString--


      }
      trueMoveLeft(canMoveLeft)

      drawField()
  }


  function trueMoveRight(canMoveRight) {
      if (!canMoveRight) {
          console.log('нельзя двигаться вправо')
          return
      }
      let curString = 16
      while (curString >= 0) {
          let curColumn = 9
          while (curColumn >= 0) {
              //   console.log(Field[curString][curColumn])
              if (Field[curString][curColumn] == 1 && Field[curString][curColumn + 1] == 0) {
                  console.log('wtf')
                  Field[curString][curColumn + 1] = 1;
                  Field[curString][curColumn] = 0
              }


              curColumn--
          }

          curString--

      }


  }


  function moveRight() {

      let curString = 16
      let canMoveRight = true
      let curColumn = 0;


      while (curString != 0) {
          curColumn = 9
          while (curColumn >= 0) {
              if ((Field[curString][curColumn] == 1 && Field[curString][curColumn + 1] == 11)) {
                  canMoveRight = false
                  console.log('Я ПАЛАМАЛ')
                  break
              }

              if (Field[curString][curColumn] == 1 && curColumn == 9) {
                  canMoveRight = false
                  console.log('Сломал')
                  break

              }

              curColumn--
          }
          if (canMoveRight == false) {
              break
          }
          curString--


      }
      trueMoveRight(canMoveRight)

      drawField()
  }



  elementClearButton.addEventListener('click', clearField)
  elementRandomButton.addEventListener('click', drawRandomElement)
  elementNextFrameButton.addEventListener('click', fall)
  elementMoveLeft.addEventListener('click', moveLeft)
  elementStartGame.addEventListener('click', () => {
      elementStartGame.textContent = 'Начать сначала'
      clearField()
      drawRandomElement()

  })
  document.addEventListener('keydown', function(event) {
      if (event.code == 'ArrowLeft') {
          moveLeft()
      }
  });
  document.addEventListener('keydown', function(event) {
      if (event.code == 'ArrowRight') {
          moveRight()
      }
  });
  document.addEventListener('keydown', function(event) {
      if (event.code == 'ArrowDown') {
          fall()
      }
  });
  elementMoveRight.addEventListener('click', moveRight)
  setInterval(fall, 1000)
      //   setInterval(fall, 1)
      // elementField.innerHTML = Field; 
      // let testObj = {
      //     I:0,
      //     J:0,
      //     L:0,
      //     O:0,
      //     S:0,
      //     T:0,
      //     Z:0,
      //     Error:0
      // }

  // for(let i = 0; i < 10000; i++){
  //     tmp = getRandomElement();
  //     testObj[tmp]++

  // }
  // console.log(testObj);