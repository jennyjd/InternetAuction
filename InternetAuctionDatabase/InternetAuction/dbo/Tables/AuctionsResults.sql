CREATE TABLE [dbo].[AuctionsResults]
(
	[Id] INT IDENTITY(1,1) NOT NULL,
	[ClientId] INT NOT NULL,
	[SumWithoutCharge] DECIMAL(20, 5) NOT NULL,
	[IsWinner] BIT NOT NULL,

	CONSTRAINT primaryAuctionsResultsKey PRIMARY KEY ([Id]),
	CONSTRAINT foreignAuctionsResultsToClientsKey FOREIGN KEY ([ClientId])
		REFERENCES Clients ([Id]),
)
