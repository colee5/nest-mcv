class Solution:
    def removeElements(self, nums: list[int], val: int) -> int:
        k = 0   
    
        for i in range(len(nums)):
            if nums[i] != val:
                nums[k] = nums[i]
                k += 1
        return k;


class Solution2:
    def getConcatenation(self, nums: list[int]) -> list[int]:
        ans = []

        for i in range(2):
            for n in nums:
                ans.append(n)
            return ans
        


class Solution3:
    def isValid(s):
        stack = []
        closeToOpen = {')': '(',']': '[','}': '{',};

        for c in s:
            if c in closeToOpen:
                if stack and stack[-1] == closeToOpen[c]:
                    stack.pop()
                else:
                    return False
            else:
                stack.push(c)
        return True if not stack else False;
        
    

class ListNode:
    
    def __init__(self, val, next_node=None):
        self.val = val
        self.next = next_node
    
class Solution3:

    def __init__(self):
        # Dummy Node - which makes the removing a node 
        # form the beginning of the list easier.
        self.head = ListNode(-1)
        self.tail

    def get(self, index:int) -> int:
        curr = self.head.next
        i = 0

        while curr:
            if i == index:
                return curr.val
            i += 1
            curr = curr.next

    def insertHead(self, val:int) -> None:           
        new_node = ListNode(val)
        new_node.next = self.head.next
        self.head.next = new_node 


class Solution4:
    def mergeTwoLists(self, l1: ListNode, l2:ListNode) -> ListNode:
        dummy = ListNode()
        tail = dummy

        while l1 and l2:
            if l1.val < l2.val:
                tail.next = l1
                l1 = l1.next
            else:
                tail.next = l2
                l2 = l2.next
            tail = tail.next

        if l1:
            tail.next = l1
        elif l2:
            tail.next = l2

        return dummy.next
    
    