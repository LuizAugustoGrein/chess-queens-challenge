var currentSize = 2;

$('#load').on('click', function(){
    var possibleQueens = getPossibleQueens(currentSize);
    possibleQueensWays = possibleQueens.possibleQueensWays;
    $('#xadrez').append(`<li>${currentSize} x ${currentSize}: ${possibleQueensWays} rainhas</li>`);

    $('#table').html('');

    var table = possibleQueens.table;

    for (var row = 0; row < currentSize; row++) {
        var currentRow = '<div class="row">';
        table.forEach(function(item, index){
            if (item.x == row) {
                if (item.queen) {
                    currentRow += '<div class="box-full"></div>';
                } else {
                    currentRow += '<div class="box-empty"></div>';
                }
            }
        })
        currentRow += '</div>';
        $('#table').append(currentRow);
    }

    currentSize = currentSize * 2;
})

function getPossibleQueens(size) {
    var x = size;
    var y = size;
    currentTable = [];

    for (var Xindex = 0; Xindex < x; Xindex++) {
        for (var Yindex = 0; Yindex < y; Yindex++) {
            currentTable.push(
                {
                    x: Xindex,
                    y: Yindex,
                    queen: false
                }
            )
        }
    }

    currentTable.forEach((itemBase, itemIndex) => {
        var canBeCreated = true;
        var possibleWays = [];
        currentTable.forEach(itemDynamic => {
            if ((itemBase.x == itemDynamic.x && itemDynamic.queen) || (itemBase.y == itemDynamic.y && itemDynamic.queen)) {
                canBeCreated = false;
            }
            
            
        });
        var itemX = itemBase.x;
        var itemY = itemBase.y;
        
        for (var indX = itemX; indX >= 0; indX--) {
            if (itemY >= 0 && indX >= 0) {
                possibleWays.push(
                    {
                        x: indX,
                        y: itemY
                    }
                )
            }
            itemY--;
        }
        itemY = itemBase.y;
        for (var indX = itemX; indX >= 0; indX--) {
            if (itemY >= 0 && indX >= 0) {
                possibleWays.push(
                    {
                        x: indX,
                        y: itemY
                    }
                )
            }
            itemY++;
        }
        possibleWays.forEach(way => {
            currentTable.forEach(element => {
                if (way.x == element.x && way.y == element.y && element.queen) {
                    canBeCreated = false;
                }
            });
        });
        if (itemIndex == 0) {
            canBeCreated = true;
        }
        if (canBeCreated) {
            currentTable[itemIndex].queen = true;
        }
    });

    var possibleQueensWays = 0;

    currentTable.forEach(element => {
        if (element.queen) {
            possibleQueensWays++;
        }
    });

    return {
        table: currentTable,
        possibleQueensWays: possibleQueensWays
    }
}