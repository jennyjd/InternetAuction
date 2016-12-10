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
DELETE FROM Auctions
DELETE FROM AuctionsCategories
DELETE FROM CurrenciesConversions
DELETE FROM Currencies
DELETE FROM CreditCards
DELETE FROM Clients
DELETE FROM GoodsState


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
(N'9c9862f5-bc3b-40a9-aeb0-7e1272049ad6', NULL, N'jan@ia.com', 0, N'AK/zw7Fk73J+po05igd28Ycjqq5BGsPMO8RYRjK5LchHNETX58crclMddraexWOdpA==', N'47563f1c-34e4-44d9-8f47-216b260307a5', NULL, 0, 0, NULL, 0, 0, N'Jan'),
(N'ecb08b9a-91f3-43e0-87eb-8109126c4882', NULL, N'jenny@ia.com', 0, N'AAosuaEci3D4SeD+jm7ge15ES3xU13p2MNjETC/ozISdGMK0Yw14S9TO8Mqhr4WdYA==', N'420338c1-e932-4dac-80ef-bd43ab0baa9d', NULL, 0, 0, NULL, 0, 0, N'Jenny'),
(N'bb23ed2d-31ac-4fd0-a918-addc403c111f', 1, N'ivan.ivanov@ia.com', 0, N'AHyhUxeVdAeiNsfTy0MTRvU+ssma6g1v3K46waW3mBFOl/Dwy9AYsQ3JQjg9PP87fg==', N'4a8a5186-d268-42d8-abf9-3430e5bedb90', NULL, 0, 0, NULL, 0, 0, N'Ivan'),
(N'425cf06d-33ec-4e48-813b-bc87a302a5a7', 2, N'peter.petrov@ia.com', 0, N'AJR9yk0/Z6mL6TaMRQqcMDpwdagtA90lPNJ3CtMOZ0u+9KvH6Mv8Z+XD6WYkfsMWbg==', N'16cfa0ff-3598-4ed0-9d02-efa0763e9de6', NULL, 0, 0, NULL, 0, 0, N'Peter'),
(N'fa3b93fd-a441-44f9-bc8d-bd3aed756817', 3, N'andrey.andreeysky@ia.com', 0, N'AB5wMn//oGZKsxUBqGBQo2AiyVCVUlN0opPuXfPD7Si0Wz5nYb6mYrxtdEObPjIItA==', N'61ebb229-189e-413a-aa5a-05e6e9215365', NULL, 0, 0, NULL, 0, 0, N'Andrey')


GO
INSERT AspNetUserRoles 
([UserId], [RoleId]) 
VALUES 
(N'9c9862f5-bc3b-40a9-aeb0-7e1272049ad6', N'4acfc82d-9387-4d7c-bf77-ff859cff3193'),
(N'ecb08b9a-91f3-43e0-87eb-8109126c4882', N'4acfc82d-9387-4d7c-bf77-ff859cff3193'),
(N'425cf06d-33ec-4e48-813b-bc87a302a5a7', N'0a1fcb13-3dc5-4313-8693-5b91ccec84ec'),
(N'bb23ed2d-31ac-4fd0-a918-addc403c111f', N'0a1fcb13-3dc5-4313-8693-5b91ccec84ec'),
(N'fa3b93fd-a441-44f9-bc8d-bd3aed756817', N'0a1fcb13-3dc5-4313-8693-5b91ccec84ec')


GO
SET IDENTITY_INSERT AuctionsCategories ON

INSERT INTO AuctionsCategories 
(Id, Name, ParentAuctionCategoryId)
VALUES 
(1, N'Коллекционирование', NULL),
(2, N'Мебель', NULL),
(3, N'Одежда', NULL),
(4, N'Монеты', 1),
(5, N'Марки', 1)

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


GO
SET IDENTITY_INSERT CurrenciesConversions ON

INSERT INTO CurrenciesConversions 
(Id, FromCurrencyId, ToCurrencyId, Rate)
VALUES 
(1, 1, 2, 1.967),
(2, 1, 3, 2.080),
(3, 2, 1, 0.51),
(4, 2, 3, 0.95),
(5, 3, 1, 0.48),
(6, 3, 2, 1.0617)

SET IDENTITY_INSERT CurrenciesConversions OFF


GO
SET IDENTITY_INSERT Clients ON

INSERT INTO Clients 
(Id, FirstName, LastName, Patronymic)
VALUES 
(1, N'Иван', N'Иванов', NULL),
(2, N'Пётр', N'Петров', NULL),
(3, N'Андрей', N'Андреевский', NULL)

SET IDENTITY_INSERT Clients OFF


GO
SET IDENTITY_INSERT CreditCards ON

INSERT INTO CreditCards 
(Id, Number, Cash, ValidTo, OwnerFirstName, OwnerLastName, CurrencyId, ClientId)
VALUES 
(1, N'1282237041056833', NULL, CAST(N'2021-08-11' AS DateTime), N'Иван', N'Иванов', NULL, 1),
(2, N'7309400641159165', NULL, CAST(N'2018-05-21' AS DateTime), N'Иван', N'Иванов', NULL, 1),
(3, N'6246746369166353', NULL, CAST(N'2019-01-07' AS DateTime), N'Пётр', N'Петров', NULL, 2),
(4, N'3047580553634127', NULL, CAST(N'2021-08-11' AS DateTime), N'Андрей', N'Андреевский', NULL, 3),
(5, N'1736656025872241', NULL, CAST(N'2020-08-09' AS DateTime), N'Андрей', N'Андреевский', NULL, 3),
(6, N'8722173641054006', NULL, CAST(N'2018-10-25' AS DateTime), N'Андрей', N'Андреевский', NULL, 3)

SET IDENTITY_INSERT CreditCards OFF


GO
SET IDENTITY_INSERT GoodsState ON

INSERT INTO GoodsState 
(Id, Name)
VALUES 
(1, N'Отличное'),
(2, N'Хорошее'),
(3, N'Нормальное'),
(4, N'Плохое')

SET IDENTITY_INSERT GoodsState OFF
