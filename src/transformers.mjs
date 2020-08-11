import { Transform } from "stream";

export class Decode extends Transform {
  _transform(chunk, enc, cont) {
    while (chunk.length > 0) {
      if (this.buffer) {
        chunk = Buffer.concat([this.buffer, chunk]);
      }
      if(chunk.length >= 4) {
        const length = chunk.readUInt32BE(0);
        const nextFrame = 4 + length;
        //console.log("FRAME", length, chunk.length >= nextFrame);
        if(chunk.length >= nextFrame) {
          this.push(chunk.slice(4, nextFrame));
          chunk = chunk.slice(nextFrame);
        }
        else { break; }
      }
      else { break; }
    }
    this.buffer = chunk;
    cont();
  }
}

export class Encode extends Transform {
  _transform(message, enc, cont) {
    const prefix = Buffer.alloc(4);
    //console.log("S FRAME",message.length);
    prefix.writeUInt32BE(message.length, 0);
    this.push(prefix);
    this.push(message);
    cont();
  }
}

function encodeLength(number, buffer, offset) {
  if (number < 0xfd) {
    buffer.writeUInt8(number, offset);
    return 1;
  } else if (number <= 0xffff) {
    buffer.writeUInt8(0xfd, offset);
    buffer.writeUInt16LE(number, offset + 1);
    return 3;
  } else if (number <= 0xffffffff) {
    buffer.writeUInt8(0xfe, offset);
    buffer.writeUInt32LE(number, offset + 1);
    return 5;
  }

  return 0;
}

function decodeLength(buffer, offset) {
  const first = buffer.readUInt8(offset)

  if (first < 0xfd) {
    return [ 1, first];
  } else if (first === 0xfd) {
    return [ 3, buffer.readUInt16LE(offset + 1)];
  } else if (first === 0xfe) {
    return [ 5, buffer.readUInt32LE(offset + 1)];
  }
  return [0];
}