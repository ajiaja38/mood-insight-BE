"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateID = void 0;
const generateID = (prefix, lastID) => {
    let nextNumber = 1;
    if (lastID && lastID.startsWith(prefix)) {
        const numericPart = parseInt(lastID.slice(prefix.length), 10);
        if (!isNaN(numericPart)) {
            nextNumber = numericPart + 1;
        }
    }
    const paddedNumber = String(nextNumber).padStart(3, '0');
    return `${prefix}${paddedNumber}`;
};
exports.generateID = generateID;
//# sourceMappingURL=generateID.js.map