import time
from collections import defaultdict

class RateLimiter:
    def __init__(self):
        self.requests = defaultdict(list)
        self.max_requests = 3
        self.window_seconds = 3600  # 1 hour
    
    def is_allowed(self, ip_address):
        now = time.time()
        # Clean old requests
        self.requests[ip_address] = [
            req_time for req_time in self.requests[ip_address]
            if now - req_time < self.window_seconds
        ]
        if len(self.requests[ip_address]) >= self.max_requests:
            return False
        self.requests[ip_address].append(now)
        return True
    
    def get_remaining(self, ip_address):
        now = time.time()
        self.requests[ip_address] = [
            req_time for req_time in self.requests[ip_address]
            if now - req_time < self.window_seconds
        ]
        return max(0, self.max_requests - len(self.requests[ip_address]))

rate_limiter = RateLimiter()
