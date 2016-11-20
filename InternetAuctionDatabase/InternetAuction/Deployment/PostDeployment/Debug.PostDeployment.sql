/*
Post-Deployment Script Template							
--------------------------------------------------------------------------------------
 This file contains SQL statements that will be appended to the build script.		
 Use SQLCMD syntax to include a file in the post-deployment script.			
 Example:      :r .\myfile.sql								
 Use SQLCMD syntax to reference a variable in the post-deployment script.		
 Example:      :setvar TableName MyTable							
               SELECT * FROM [$(TableName)]					
--------------------------------------------------------------------------------------
*/

GO
DELETE FROM AuctionsCategories
DELETE FROM Currencies

GO
SET IDENTITY_INSERT AuctionsCategories ON

INSERT INTO AuctionsCategories 
(Id, Name, ParentAuctionCategoryId)
VALUES 
(1, N'Category1', NULL),
(2, N'Category2', NULL),
(3, N'Category3', 1)

SET IDENTITY_INSERT AuctionsCategories OFF

GO
SET IDENTITY_INSERT Currencies ON

INSERT INTO Currencies 
(Id, Name, ShortName)
VALUES 
(1, N'BLR', N'BLR'),
(2, N'US', N'US'),
(3, N'EUR', N'EUR')

SET IDENTITY_INSERT Currencies OFF