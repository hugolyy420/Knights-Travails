function knightMoves(start, end) {
  if (
    start[0] < 0 ||
    start[0] > 7 ||
    start[1] < 0 ||
    start[1] > 7 ||
    end[0] < 0 ||
    end[0] > 7 ||
    end[1] < 0 ||
    end[1] > 7
  ) {
    console.log('Invalid node');
    return;
  }

  const graph = {};
  let queue = [[start, []]];
  let seen = new Set();

  while (queue.length) {
    let [currentNode, [...path]] = queue.shift();
    path.push(currentNode);

    if (nodesAreEqual(currentNode, end)) {
      const count = path.length - 1;
      console.log(`You made it in ${count} moves! Here's your path:`);
      path.forEach((step) => console.log(step));
      return;
    }

    const potentialMoves = getKnightMoves(currentNode);
    if (!graph[currentNode]) graph[currentNode] = [...potentialMoves];

    if (!seen.has(currentNode) && graph[currentNode]) {
      queue.push(...graph[currentNode].map((node) => [node, path]));
    }
    seen.add(currentNode);
  }
}

function getKnightMoves(node) {
  const moves = [];
  const offsets = [
    [1, 2],
    [2, 1],
    [-1, -2],
    [-2, -1],
    [2, -1],
    [1, -2],
    [-2, 1],
    [-1, 2],
  ];

  for (const offset of offsets) {
    const i = node[0] + offset[0];
    const j = node[1] + offset[1];
    if (i >= 0 && i < 8 && j >= 0 && j < 8) moves.push([i, j]);
  }

  return moves;
}

function nodesAreEqual(nodeOne, nodeTwo) {
  if (nodeOne.length !== nodeTwo.length) {
    return false;
  }

  for (let i = 0; i < nodeOne.length; i++) {
    if (nodeOne[i] !== nodeTwo[i]) {
      return false;
    }
  }

  return true;
}

knightMoves([0, 0], [3, 3]);
// You made it in 2 moves! Here's your path:
// [ 0, 0 ]
// [ 1, 2 ]
// [ 3, 3 ]
knightMoves([3, 3], [0, 0]);
// You made it in 2 moves! Here's your path:
// [ 3, 3 ]
// [ 2, 1 ]
// [ 0, 0 ]
knightMoves([3, 3], [4, 3]);
// You made it in 3 moves! Here's your path:
// [ 3, 3 ]
// [ 4, 5 ]
// [ 2, 4 ]
// [ 4, 3 ]
knightMoves([0, 0], [7, 7]);
// You made it in 6 moves! Here's your path:
// [ 0, 0 ]
// [ 1, 2 ]
// [ 2, 4 ]
// [ 3, 6 ]
// [ 5, 7 ]
// [ 6, 5 ]
// [ 7, 7 ]
knightMoves([0, 8], [7, 0]);
// Invalid node
knightMoves([0, -1], [7, 0]);
// Invalid node
