"use strict";

/**
 * @author DevAuthors
 * @createdDate 19.09.20
 * @lastUpdate 24.09.20
 * @copyright GNU
 * @file protos2d.js 
 */

(function (G) {
    //#region --- Helper functions
    function autoCapitalize(String) {
        let tmp = [...String];
        tmp[0] = tmp[0].toUpperCase();
        return tmp.join('');
    }
    //#endregion

    class Canvas {
        constructor(HTMLCanvasElement) {
            this.canvas = HTMLCanvasElement;
            this.ctx = HTMLCanvasElement.getContext('2d');
            this.fillColor = "#000000";
            this.strokeColor = "#ffffff";

            this.active = false;
        }
        // Setup with p5.js & remove p5.default.Canvas
        Setup() {
            createCanvas(0, 0);
            addToGlobal("Vector", createVector);

            document.body.removeChild(document.querySelector('main'));
            this.active = true;

            return this;
        }
        prepare() {
            if (!this.active) throw new Error("\n" +
                "No initialize\n" +
                "Add this code: \n" +
                "function setup(){(protos.Canvas).Setup()}"
            );
        }

        resize(Width, Height) {
            this.canvas.width = Width;
            this.canvas.height = Height;
            return this;
        }

        setColors(fill, stroke) {
            this.prepare();
            this.fillColor = fill || this.fillColor;
            this.strokeColor = stroke || this.strokeColor;
        }
        updtColors() {
            this.prepare();
            this.ctx.fillStyle = this.fillColor;
            this.ctx.strokeStyle = this.strokeColor;
        }
        rect(pos, size) {
            this.updtColors();
            this.ctx.fillRect(pos.x, pos.y, size.x, size.y);
            this.ctx.strokeRect(pos.x, pos.y, size.x, size.y);
        }
        // pos,     size,   rot, start, end [, anticlock]
        // Vector,  Vector, Ang,  Ang,  ang [, boolean]  
        ellipse(pos, size, rot, start, end, anticlock, complete) {
            this.updtColors();
            this.bgPath();
            if(complete) this.move(pos);
            this.ctx.ellipse(
                pos.x, pos.y,
                size?.x || size, size?.y || size,
                rot || 0,
                start, end,
                anticlock || false
            );
            if(complete) this.line(pos);
            this.rxPath();
        }
        //#region --- Path funcs
        bgPath() { this.prepare(); this.ctx.beginPath() }
        clPath() { this.prepare(); this.ctx.closePath() }
        rxPath() {
            this.updtColors();
            this.ctx.fill();
            this.ctx.stroke();
        }
        move(pos) { this.prepare(); this.ctx.moveTo(pos.x, pos.y) }
        line(pos) { this.prepare(); this.ctx.lineTo(pos.x, pos.y) }
        //#endregion

        autoColor(fillOrStroke) {
            this.prepare();
            if (!fillOrStroke) {
                const s = [...this.strokeColor];
                s.shift();

                const a = Math.floor(s.length / 2);

                let R = parseInt(s.slice(a * 0, a * 1).join(""), 16);
                let G = parseInt(s.slice(a * 1, a * 2).join(""), 16);
                let B = parseInt(s.slice(a * 2, a * 3).join(""), 16);

                R = Math.min(R + 25, 255);
                G = Math.min(G + 25, 255);
                B = Math.min(B + 25, 255);

                R = R.toString(16);
                G = G.toString(16);
                B = B.toString(16);

                this.fillColor = "#" + R + G + B;
                return "#" + R + G + B;
            } else {
                const f = [...this.fillColor];
                f.shift();

                let R = parseInt(f.slice(0, 2).join(""), 16);
                let G = parseInt(f.slice(2, 4).join(""), 16);
                let B = parseInt(f.slice(4, 6).join(""), 16);

                R = Math.max(R - 25, 0);
                G = Math.max(G - 25, 0);
                B = Math.max(B - 25, 0);

                R = R.toString(16);
                G = G.toString(16);
                B = B.toString(16);

                this.strokeColor = "#" + R + G + B;
                return "#" + R + G + B;
            }
        }
    }

    //#region --- Keys
    const Keys = [];
	G.onkeydown = e => {
		const K = e.key.toUpperCase().charCodeAt(0);
		let Found = false;
		let FoundPos = 0;

		Keys.find((e, i) => {
			if (e.code == K) {
				Found = true;
				FoundPos = i;
			}
		});

		if (!Found) {
			Keys.unshift({
				code: K,
				key: e.key,
				isShifted: e.shiftKey,
				isCtrled: e.ctrlKey,
				codeLower: (K >= 65 && K <= 90 ? e.key.toLowerCase().charCodeAt() : K)
			});
		}

		keysUpdt();
	}

	G.onkeyup = e => {
		const K = e.key.toUpperCase().charCodeAt(0);
		let Found = false;
		let FoundPos = 0;

		Keys.find((e, i) => {
			if (e.code == K) {
				Found = true;
				FoundPos = i;
			}
		});

		if (Found) {
			Keys.splice(FoundPos, 1);
		}

		keysUpdt();
	}
	function keysUpdt() {
		addToGlobal("Keys", Keys);
    }
    //#endregion

    function loop(F, S){
        setInterval(F, S)
    }

    function addToGlobal(Name, Value) {
        G.protos = G.protos || {};
        if (typeof Name !== 'string') throw new Error(
            "Invalid parameter\n" +
            "Expect: addToGlobal(Name: String, Value: Any)\n" +
            `Ingresed: addToGlobal(Name: ${autoCapitalize(typeof Name)}, Value: ${autoCapitalize(typeof Value)})`);
        G.protos[Name] = Value;
    }

    //#region --- Add all
    addToGlobal("Canvas", Canvas);
    addToGlobal("Keys", Keys);
    addToGlobal("W100", window.innerWidth);
    addToGlobal("H100", window.innerHeight);
    addToGlobal("loop", loop);
    //#endregion
})(window || this);