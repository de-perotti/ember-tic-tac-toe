# Tic Tac Toe

#### Considerations

- Game service is an aggregator that keeps track of session, board and players
- Events and models are persisted as soon as possible
- First imperatively, then test-driven

#### TODO
- [ ] Drop yarn support in favor of pnpm
- [ ] Make matrix in workflow use a glob pattern for packages/*
- [ ] Split workflow jobs

#### Tasks
- Getting started
    - [x] Create README.md
    - [x] Add git actions
    - [x] Deploy to surge.sh
- Imperatively
    - Playing
        - [x] Create models
        - [x] Create localforage adapter
        - [x] Create game service
        - [x] Create tile component
        - [x] Create player turn component
        - [x] Create board component
        - [x] Enable starting a game
        - [x] Enable making a move
        - [x] Enable winning a game
        - [x] Enable drawing a game
        - [x] Enable saving unfinished games
        - [x] Enable starting a game after finishing
        - [ ] Enable players to choose their tickers
        - [ ] Enable players to choose their names
        - [ ] Enable more than two players
        - [ ] Enable more than 3x3 boards
        - [ ] Enable checking for a draw before finishing
        - [ ] Enable checking event history as players play
    - Checking sessions' games
        - [ ] Create session plp
        - [ ] Create session pdp
        - [ ] Enable continuing an unfinished game
    - Checking games' history
        - [ ] Create game plp
        - [ ] Create game pdp
        - [ ] Enable replaying the moves
        - [ ] Enable controlling speed of replay
- [ ] Add typescript
- [ ] Add fastboot
- [ ] Add eslint
- [ ] Add prettier
- [ ] Add git hooks
- [ ] Create monorepo with pnpm
- [ ] Extract what can be extracted from imperative
    - Maybe as addon?
    - Can models and services be declared from outside an ember project and be used in this same project without having to declare a file for it?
- TDD
    - Playing
        - [ ] Create models
        - [ ] Create localforage adapter
        - [ ] Create game service
        - [ ] Create tile component
        - [ ] Create player turn component
        - [ ] Create board component
        - [ ] Enable starting a game
        - [ ] Enable making a move
        - [ ] Enable winning a game
        - [ ] Enable drawing a game
        - [ ] Enable saving unfinished games
        - [ ] Enable starting a game after finishing
        - [ ] Enable players to choose their tickers
        - [ ] Enable players to choose their names
        - [ ] Enable more than two players
        - [ ] Enable more than 3x3 boards
        - [ ] Enable checking for a draw before finishing
        - [ ] Enable checking event history as players play
    - Checking sessions' games
        - [ ] Create session plp
        - [ ] Create session pdp
        - [ ] Enable continuing an unfinished game
    - Checking games' history
        - [ ] Create game plp
        - [ ] Create game pdp
        - [ ] Enable replaying the moves
        - [ ] Enable controlling speed of replay

#### Starting the application

```mermaid
sequenceDiagram
	participant user as User
	participant page as Page
	participant service as Game Service
	
	user ->> page : enters
	page ->> service : upsert latest
	Note left of service : indexed on day
	service ->> page : 
	page ->> user : do what you want
	user ->> page : interacts
	alt new game
		page ->> service : new game
	else iterates through sessions
		page ->> page : display sessions
	else iterates through sessions' games
		page ->> page : display sessions' history
	else iterates through sessions' games
		page ->> page : display sessions' history
	else iterates through sessions' games' history
		page ->> page : display sessions' games' history
	end
```

#### Starting a game

```mermaid
sequenceDiagram
	participant user as User
	participant page as Page
	participant service as Game Service
	participant session as Session
	participant board as Board
	participant tile as Tile
	participant player as Player
	participant session_history as Session History

	user ->> page : new game
	activate page
		page ->> page : state : loading
		page ->> service : create game

		activate service
			service ->> session : get latest
			session ->> service : 
			alt latest session
				service ->> board : create

				Note left of board:  { players: number = 2 }
				board ->> service : 
				service ->> session : push board 
				session ->> session_history: put board into history
				service ->> player: create n players
				player ->> service : 
				service ->> board : set players
				service ->> tile: create n tiles
				tile ->> service : 
				service ->> board : set tiles

			end
			service ->> page : created
		deactivate service	

		page ->> page : state : playing
	deactivate page
```

#### A move
```mermaid
sequenceDiagram
	participant player as Player
	participant tile as Tile
	participant service as Game Service
	participant board as Board
	participant board_history as Board History
	participant page as Page
	
	
	player ->> tile : click
	tile ->> service : player clicked
	service ->> service : validate move
	alt is valid event
		service ->> board_history : register event
			Note right of board: Although registering events, we do not allow for undo/redo
		service ->> tile : go ahead and update
		tile ->> tile : display player ticker on tile

		alt is finishing condition
			service ->> service : we are done here
			par
				service ->> page : display new game button
			and
				alt is winning
					service ->> page : display winner
				else is draw
					service ->> page : display draw
				end
			end

		end
	end
```

#### Relationships
```mermaid
erDiagram
	user
	session
	session_history
	board
	board_history
	tile
	player
	player_event

	user ||--|{ session : keeps
	session ||--|| session_history : has
	session_history ||--|{ board : registers
	session }|--o{ player : has
	board }|--|{ player : has
	board ||--|| board_history : tracks
	player_event ||--|| tile : relates
	board ||--|{ tile : has
	player_event }|--|| player : belongs_to
	board_history ||--o{ player_event : registers
```

#### Contributing

Feel free to open a Pull Request however you'd like.
