##                    Ride Booking Backend
                            │
             ┌──────────────┴──────────────┐
             │                             │
  ##        DRIVERS                         RIDES
             │                             │
      ┌──────┼──────┐              ┌───────┼────────┐
      │      │      │              │       │        │
   GET    GET    GET            GET     GET      POST
     all   single  filter        all     single    book
