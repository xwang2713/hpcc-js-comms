import { expect } from "chai";

import { Observable } from "../../src/util/observer";

describe("observer", function () {
    it("reference counter", function () {
        function echoEvent() {
            // console.log(JSON.stringify(args));
        }
        const et = new Observable("aaa", "bbb", "zzz");
        expect(et.hasObserver()).is.false;
        et.addObserver("aaa", echoEvent);
        expect(et.hasObserver()).is.true;
        expect(et.hasObserver("aaa")).is.true;
        expect(et.hasObserver("bbb")).is.false;
        et.addObserver("bbb", echoEvent);
        const h = et.addObserver("bbb", echoEvent);
        expect(et.hasObserver()).is.true;
        expect(et.hasObserver("aaa")).is.true;
        expect(et.hasObserver("bbb")).is.true;
        et.removeObserver("aaa", echoEvent);
        expect(et.hasObserver()).is.true;
        expect(et.hasObserver("aaa")).is.false;
        expect(et.hasObserver("bbb")).is.true;
        h.release();
        expect(et.hasObserver()).is.false;
        expect(et.hasObserver("aaa")).is.false;
        expect(et.hasObserver("bbb")).is.false;
    });
    it("message dispatch", function () {
        const et = new Observable("aaa", "bbb", "zzz");
        et.addObserver("aaa", (a, b, c, d) => {
            expect(a).to.equal(1);
            expect(b).to.equal(2);
            expect(c).to.equal(3);
            expect(d).to.be.undefined;
        });
        et.dispatchEvent("aaa", 1, 2, 3);
    });
});
