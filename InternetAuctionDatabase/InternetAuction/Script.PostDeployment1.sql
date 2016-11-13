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
SET IDENTITY_INSERT AuctionCategories OFF

INSERT INTO AuctionCategories 
(Id, Name, AuctionCategoryId)
VALUES 
(1, N'Category1', NULL),
(2, N'Category2', NULL),
(3, N'Category3', 1)

SET IDENTITY_INSERT AuctionCategories OFF