-- delete all tables if they already exist
DROP TABLE IF EXISTS Messages;
DROP TABLE IF EXISTS ServerMembers;
DROP TABLE IF EXISTS Channels;
DROP TABLE IF EXISTS Servers;
DROP TABLE IF EXISTS Users;

-- table creation
CREATE TABLE IF NOT EXISTS Servers (
	ServerId SERIAL PRIMARY KEY,
	ServerName varchar(40) NOT NULL
);

CREATE TABLE IF NOT EXISTS Channels (
	ChannelId SERIAL PRIMARY KEY,
	ChannelName varchar(40) NOT NULL,
	ServerId INT NOT NULL,
	CONSTRAINT fk_server FOREIGN KEY(ServerId) 
	REFERENCES Servers(ServerId)
);

CREATE TABLE IF NOT EXISTS Users (
	UserId SERIAL PRIMARY KEY,
	UserName VARCHAR(40) NOT NULL,
	UserPassword VARCHAR(100)
);

CREATE TABLE IF NOT EXISTS ServerMembers(
	ServerMemberId SERIAL PRIMARY KEY,
	ServerId INT NOT NULL,
	UserId INT NOT NULL,
	CONSTRAINT fk_server FOREIGN KEY(ServerId)
	REFERENCES Servers(ServerId),
	CONSTRAINT fk_User FOREIGN KEY(UserId)
	REFERENCES Users(UserId)
);

CREATE TABLE IF NOT EXISTS Messages (
	MessageId SERIAL PRIMARY KEY,
	ChannelId INT NOT NULL,
	UserId INT NOT NULL,
	CreationTime Timestamp NOT NULL,
	MessageContent VARCHAR(1000),
	CONSTRAINT fk_channel FOREIGN KEY(ChannelId)
	REFERENCES Channels(ChannelId),
	CONSTRAINT fk_user FOREIGN KEY(UserId)
	REFERENCES Users(UserId)
);

-- initialize sample data
INSERT INTO Servers (ServerName)
VALUES('test');

INSERT INTO Channels (ChannelName, ServerId)
VALUES('general', 1),
('csgo', 1),
('genshin', 1);

INSERT INTO Users (UserName)
VALUES('Tom'),
('Jim');

INSERT INTO ServerMembers (ServerId, UserId)
VALUES (1, 1),
(1, 2);






