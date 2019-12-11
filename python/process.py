import cv2
import sys


# print(sys.argv[1])

imagePath = str(sys.argv[1])
filename = imagePath.split('/')
filename = filename[len(filename) - 1]

# print(filename)
# /Users/odds/git/calculate-plant-area/uploads/59f1d1799465b96b149533d2def9524f

p1 = cv2.imread(imagePath, cv2.IMREAD_COLOR)
# print(p1)

# cv2.imwrite('../processed/' + 'test' + '.png', p1)
writeStatus = cv2.imwrite('./processed/' + filename + '.png', p1)
while writeStatus is False:
    None
print(filename + '.png')