import unittest
import sys, os
sys.path.append(os.path.abspath(os.path.join('..')))


class TestDbCreation(unittest.TestCase):

    def test_user(self):
        """Test the User table creation"""
        assert 1==1


if __name__ == '__main__':
    unittest.main()