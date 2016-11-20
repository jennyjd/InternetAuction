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
DELETE FROM AspNetUserRoles
DELETE FROM AspNetUsers
DELETE FROM AspNetRoles
DELETE FROM AuctionsCategories
DELETE FROM Currencies

GO
INSERT AspNetRoles 
([Id], [Name], [Discriminator]) 
VALUES 
(N'0a1fcb13-3dc5-4313-8693-5b91ccec84ec', N'Client', N'InternetAuctionRole'),
(N'4acfc82d-9387-4d7c-bf77-ff859cff3193', N'Administrator', N'InternetAuctionRole')

GO
INSERT AspNetUsers 
([Id], [ClientId], [Email], [EmailConfirmed], [PasswordHash], [SecurityStamp], [PhoneNumber], [PhoneNumberConfirmed], [TwoFactorEnabled], [LockoutEndDateUtc], [LockoutEnabled], [AccessFailedCount], [UserName]) 
VALUES 
(N'98ae62c3-9538-4f0a-a2f1-162cb6cc2945', 1, N'client@ia.com', 0, N'AK/CGl6c8mFKGn5vC0kghZpwNaht5Vh2sQ3IMv1/dfCaHQAoyvsi0oUJEeFd9AZdng==', N'793f96a7-07cd-4e2a-b166-5c5ab18f0a2b', NULL, 0, 0, NULL, 0, 0, N'Client'),
(N'9c9862f5-bc3b-40a9-aeb0-7e1272049ad6', NULL, N'jan@ia.com', 0, N'AK/zw7Fk73J+po05igd28Ycjqq5BGsPMO8RYRjK5LchHNETX58crclMddraexWOdpA==', N'47563f1c-34e4-44d9-8f47-216b260307a5', NULL, 0, 0, NULL, 0, 0, N'Jan'),
(N'ecb08b9a-91f3-43e0-87eb-8109126c4882', NULL, N'jenny@ia.com', 0, N'AAosuaEci3D4SeD+jm7ge15ES3xU13p2MNjETC/ozISdGMK0Yw14S9TO8Mqhr4WdYA==', N'420338c1-e932-4dac-80ef-bd43ab0baa9d', NULL, 0, 0, NULL, 0, 0, N'Jenny')

GO
INSERT AspNetUserRoles 
([UserId], [RoleId]) 
VALUES 
(N'98ae62c3-9538-4f0a-a2f1-162cb6cc2945', N'0a1fcb13-3dc5-4313-8693-5b91ccec84ec'),
(N'9c9862f5-bc3b-40a9-aeb0-7e1272049ad6', N'4acfc82d-9387-4d7c-bf77-ff859cff3193'),
(N'ecb08b9a-91f3-43e0-87eb-8109126c4882', N'4acfc82d-9387-4d7c-bf77-ff859cff3193')

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
