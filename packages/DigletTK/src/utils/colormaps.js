const vr_muscle_bone = {
  red: [
    0, 2, 5, 8, 10, 13, 16, 18, 21, 24, 26, 29, 32, 34, 37, 40, 42, 45, 48, 51, 53, 56, 59, 61, 64,
    67, 69, 72, 75, 77, 80, 83, 85, 88, 91, 93, 96, 99, 102, 104, 107, 110, 112, 115, 118, 120, 123,
    126, 128, 131, 134, 136, 139, 142, 144, 147, 150, 153, 155, 158, 161, 163, 166, 169, 171, 174,
    177, 179, 182, 185, 187, 190, 193, 195, 198, 201, 204, 206, 209, 212, 214, 217, 220, 222, 225,
    228, 230, 233, 236, 238, 241, 244, 246, 249, 252, 255, 255, 255, 255, 255, 255, 255, 255, 255,
    255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255,
    255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255,
    255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255,
    255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255,
    255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255,
    255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255,
    255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255,
    255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255
  ],
  green: [
    0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 6, 6, 6, 6, 6, 7,
    7, 7, 7, 8, 8, 8, 8, 9, 9, 9, 9, 9, 10, 10, 10, 10, 11, 11, 11, 11, 12, 12, 12, 12, 12, 13, 13,
    13, 13, 14, 14, 14, 14, 15, 15, 15, 15, 15, 16, 16, 16, 16, 17, 17, 17, 17, 18, 18, 18, 18, 18,
    19, 19, 19, 19, 20, 20, 20, 20, 21, 21, 21, 21, 21, 24, 27, 30, 33, 36, 39, 42, 45, 48, 51, 54,
    57, 60, 63, 66, 69, 72, 75, 78, 81, 84, 87, 90, 93, 96, 99, 102, 105, 108, 111, 114, 117, 120,
    123, 126, 129, 131, 134, 137, 140, 143, 146, 149, 152, 155, 158, 161, 164, 167, 170, 173, 176,
    177, 179, 180, 181, 182, 183, 185, 186, 187, 188, 189, 191, 192, 193, 194, 195, 197, 198, 199,
    200, 201, 203, 204, 205, 206, 207, 209, 210, 211, 212, 213, 215, 216, 217, 218, 220, 221, 222,
    223, 224, 226, 227, 228, 229, 230, 232, 233, 234, 235, 236, 238, 239, 240, 241, 241, 242, 242,
    242, 242, 243, 243, 243, 243, 244, 244, 244, 244, 245, 245, 245, 245, 246, 246, 246, 246, 247,
    247, 247, 247, 248, 248, 248, 248, 248, 249, 249, 249, 249, 250, 250, 250, 250, 251, 251, 251,
    251, 252, 252, 252, 252, 253, 253, 253, 253, 254, 254, 254, 254
  ],
  blue: [
    0, 0, 0, 0, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 4, 4, 4, 5, 5, 5, 5, 6, 6, 6, 7, 7, 7, 7, 8, 8, 8, 9,
    9, 9, 10, 10, 10, 10, 11, 11, 11, 12, 12, 12, 12, 13, 13, 13, 14, 14, 14, 15, 15, 15, 15, 16,
    16, 16, 17, 17, 17, 17, 18, 18, 18, 19, 19, 19, 20, 20, 20, 20, 21, 21, 21, 22, 22, 22, 22, 23,
    23, 23, 24, 24, 24, 25, 25, 25, 25, 26, 26, 26, 27, 27, 27, 27, 27, 27, 26, 26, 26, 25, 25, 25,
    24, 24, 24, 23, 23, 22, 22, 22, 21, 21, 21, 20, 20, 20, 19, 19, 19, 18, 18, 18, 17, 17, 16, 16,
    16, 15, 15, 15, 14, 14, 14, 13, 13, 13, 12, 12, 11, 11, 11, 10, 10, 10, 9, 9, 10, 10, 11, 11,
    12, 12, 13, 13, 14, 15, 15, 16, 16, 17, 17, 18, 18, 19, 19, 20, 21, 21, 22, 22, 23, 23, 24, 24,
    25, 26, 26, 27, 27, 28, 28, 29, 29, 30, 31, 31, 32, 32, 33, 33, 34, 34, 35, 36, 36, 37, 37, 38,
    38, 39, 43, 47, 51, 55, 58, 62, 66, 70, 74, 78, 82, 86, 90, 94, 98, 102, 105, 109, 113, 117,
    121, 125, 129, 133, 137, 141, 145, 149, 153, 156, 160, 164, 168, 172, 176, 180, 184, 188, 192,
    196, 200, 204, 207, 211, 215, 219, 223, 227, 231, 235, 239, 243, 247, 251
  ]
}

export const createColorMap = function () {
  let colorNodes = []

  for (let i = 0; i < 256; i += 1) {
    colorNodes.push({
      x: i / 256,
      y: i / 256,
      color: [
        vr_muscle_bone.red[i] / 255,
        vr_muscle_bone.green[i] / 255,
        vr_muscle_bone.blue[i] / 255
      ]
    })
  }

  return colorNodes
}

export const createPreset = function () {
  let numberOfColors = vr_muscle_bone.red.length
  let targetLength = Math.ceil(numberOfColors / 3) * 4
  let rgbPoints = new Array(targetLength)

  for (let i = 0; i < numberOfColors; i++) {
    rgbPoints[i * 4] = i / numberOfColors // position from -1 to 1
    rgbPoints[i * 4 + 1] = vr_muscle_bone.red[i] / 255 // R
    rgbPoints[i * 4 + 2] = vr_muscle_bone.green[i] / 255 // G
    rgbPoints[i * 4 + 3] = vr_muscle_bone.blue[i] / 255 // B
  }

  let preset = {
    ColorSpace: 'RGB', // RGB, HSV, Diverging, Lab
    Name: 'MuscleBone',
    NanColor: [0, 1, 0],
    RGBPoints: rgbPoints
  }
  return preset
}
