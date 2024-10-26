//Logic to allow player to make a move on the board
let boxes = document.getElementById('boxes');
let title = document.getElementById("title");
let allBoxes = document.querySelectorAll('.box');
let reset = document.getElementById("reset");
let playerMove = 'X';
let count = 0;
function move(e){
    if (e.target.id === 'boxes') return;
    if (e.target.innerHTML !== '') return;
    let box = e.target;
    box.innerHTML = playerMove;
    count++;
    checkWinner();
    playerMove = (playerMove === 'X') ? 'O' : 'X';
    if(count === 9)
        {
            title.innerHTML = "It's a Draw!";
            allBoxes.forEach((box) => {
                box.style.backgroundColor = '#f0ebeb';
            })
        }
}
boxes.addEventListener('click',move)

//logic of how a player can win the game
let winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]
function checkWinner() {
    winningConditions.forEach((condition) => {
        let index0 = condition[0];
        let index1 = condition[1];
        let index2 = condition[2];
        let box0 = allBoxes[index0];
        let box1 = allBoxes[index1];
        let box2 = allBoxes[index2];
        if (box0.innerHTML !== '') {
            if (box0.innerHTML === box1.innerHTML && box1.innerHTML === box2.innerHTML) {
                title.innerHTML = `Player "${box0.innerHTML}" won`;
                condition.forEach((indx)=>
                {
                    allBoxes[indx].style.backgroundColor = 'var(--ternary)';
                })
                boxes.removeEventListener('click',move);
                count = 0;
            }
        }
    })
}
//Reset game
reset.addEventListener('click',()=>
{
    allBoxes.forEach((box) => {
        box.innerHTML = '';
        box.style.backgroundColor = 'white';
    })
    boxes.addEventListener('click',move);
    title.innerHTML = "Tic Tac Toe";
    playerMove = 'X';
    count = 0;
})
