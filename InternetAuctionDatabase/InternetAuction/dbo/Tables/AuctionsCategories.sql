CREATE TABLE [dbo].[AuctionsCategories]
(
	[Id] SMALLINT IDENTITY(1,1) NOT NULL,
	[Name] NVARCHAR(50) NOT NULL,
	[ParentAuctionCategoryId] SMALLINT NULL,

	CONSTRAINT primaryAuctionsCategoriesKey PRIMARY KEY ([Id]),
	CONSTRAINT foreignAuctionsCategoriesToAuctionCategories FOREIGN KEY ([ParentAuctionCategoryId])
		REFERENCES [AuctionsCategories] ([Id])
)
