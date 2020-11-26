class Graph {
    constructor() {
        this.AdjList = new Map();
    }

    // BASIC METHODS
    addVertex(vertex) {
        if (!this.AdjList.has(vertex)) {
            this.AdjList.set(vertex, []);
        } else {
            throw 'Already Exists!!!';
        }
    }
    
    

    addEdge(vertex, node) {
        if (this.AdjList.has(vertex)) {
            if (this.AdjList.has(node)) {
                let arr = this.AdjList.get(vertex);
                if (!arr.includes(node)) {
                    arr.push(node);
                }
            } else {
                throw `Can't add non-existing vertex ->'${node}'`;
            }
        } else {
            throw `You should add '${vertex}' first`;
        }
    }
    
    
    print() {
        for (let [key, value] of this.AdjList) {
            console.log(key, value);
        }
    }
}


// The FifteenGame Total graph will be a tree where the root node is the empty moveList []
// it has 9 branches for the first move of the game. 
// The number of branches decreases in each layer past that point as the moveList gets longer. 