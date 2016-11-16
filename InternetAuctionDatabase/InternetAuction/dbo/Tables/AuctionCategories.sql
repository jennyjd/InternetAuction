CREATE TABLE [dbo].[AuctionCategories]
(
	[Id] SMALLINT IDENTITY(1,1) NOT NULL,
	[Name] NVARCHAR(50) NOT NULL,
	[ParentAuctionCategoryId] SMALLINT NULL,

	CONSTRAINT primaryAuctionCategoriesKey PRIMARY KEY ([Id]),
	CONSTRAINT foreignAuctionCategoriesToAuctionCategories FOREIGN KEY ([ParentAuctionCategoryId])
		REFERENCES [AuctionCategories] ([Id])
)
