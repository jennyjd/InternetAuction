CREATE TABLE [dbo].[AuctionsResults]
(
	[Id] INT IDENTITY(1,1) NOT NULL,
	[ClientId] INT NOT NULL,
	[AuctionId] INT NOT NULL,
	[IsSeenResult] BIT NOT NULL,

	CONSTRAINT primaryAuctionsResultsKey PRIMARY KEY ([Id]),
	CONSTRAINT foreignAuctionsResultsToClientsKey FOREIGN KEY ([ClientId])
		REFERENCES Clients ([Id]),
	CONSTRAINT foreignAuctionsResultsToAuctionsKey FOREIGN KEY ([AuctionId])
		REFERENCES Auctions ([Id]),
)
