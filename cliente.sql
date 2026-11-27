CREATE TABLE cliente 
( 
 id INT PRIMARY KEY AUTO_INCREMENT,  
 nome VARCHAR(100) NOT NULL,  
 cpf CHAR(14) NOT NULL UNIQUE,  
 celular CHAR(14) NOT NULL,  
 email VARCHAR(100) NOT NULL UNIQUE,  
 senha VARCHAR(512) NOT NULL
); 
DROP TABLE cliente;

INSERT INTO cliente (
    nome, cpf, celular, email, senha
) VALUES (
    "Patrick Staroin", "111.222.333-66", 
    "(42)99999-4444", "patrick@gmail.com",
    "EAUHEAUISHEUIEAIS"
);

INSERT INTO cliente (nome, cpf, celular, email, senha) VALUES 
('Larissa Mendes Figueiredo', '147.258.369-01', '(11)99123-4567', 'larissa.figueiredo@email.com', 'LARI2024F'),
('Gustavo Henrique Ramos', '258.369.147-02', '(21)98234-5678', 'gustavo.ramos@email.com', 'GUSHR88'),
('Patrícia Souza Andrade', '369.147.258-03', '(31)97345-6789', 'patricia.andrade@email.com', 'PATYAND9'),
('Rodrigo Lima Teixeira', '741.852.963-04', '(41)96456-7890', 'rodrigo.teixeira@email.com', 'RODRIGOT4'),
('Vanessa Carvalho Duarte', '852.963.741-05', '(51)95567-8901', 'vanessa.duarte@email.com', 'VANESSA2024'),
('Felipe Augusto Nogueira', '963.741.852-06', '(61)94678-9012', 'felipe.nogueira@email.com', 'FELIPEAN7'),
('Renata Borges Siqueira', '159.357.486-07', '(71)93789-0123', 'renata.siqueira@email.com', 'RESIQ2024'),
('Marcelo Dias Fonseca', '357.486.159-08', '(81)92890-1234', 'marcelo.fonseca@email.com', 'MARCFON12'),
('Aline Ribeiro Campos', '486.159.357-09', '(91)91901-2345', 'aline.campos@email.com', 'ALINERC5'),
('Diego Ferreira Lopes', '624.813.579-10', '(12)90012-3456', 'diego.lopes@email.com', 'DIEGOFL3');

SELECT email, senha FROM cliente;

SELECT email, senha FROM cliente 
WHERE email = "rodrigo.teixeira@email.com";

SELECT * FROM cliente WHERE id <= 30 AND LENGTH(senha) > 20;

SELECT * FROM cliente;

DELETE FROM cliente WHERE id = 37;

UPDATE cliente 
SET nome = "Patrick Staroin", email = "p@gmail.com" 
WHERE id = 35;