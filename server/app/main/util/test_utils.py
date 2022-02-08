import unittest
import preprocess_datetime


class utilsTest(unittest.TestCase):
    def test_getCurrentTime(self):
        output=preprocess_datetime.getCurrentTime()
        print(output)
        self.assertEqual(output, "11:47")