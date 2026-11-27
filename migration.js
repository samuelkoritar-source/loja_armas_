const db = require("./db")

// DROP na ordem inversa das FKs: itens -> compra -> imagem -> produto -> cliente
const ESTRUTURA_CLIENTE = `
    DROP TABLE IF EXISTS item_compra;
    DROP TABLE IF EXISTS compra;
    DROP TABLE IF EXISTS produto;
    DROP TABLE IF EXISTS cliente;

    CREATE TABLE cliente (
        id int(11) NOT NULL AUTO_INCREMENT,
        nome varchar(100) NOT NULL,
        cpf char(14) NOT NULL,
        celular char(14) NOT NULL,
        email varchar(100) NOT NULL,
        senha varchar(512) NOT NULL,
        PRIMARY KEY (id),
        UNIQUE KEY cpf (cpf),
        UNIQUE KEY email (email)
    ) ENGINE=InnoDB AUTO_INCREMENT=39 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
`

const DADOS_CLIENTE = `
    INSERT INTO cliente VALUES 
        (12,'Nicolas Galvão','123.456.789-00','(42)99966-4444','galvao@gmail.com','$2b$10$N8b2YuzXWdMJVAAd670qG.ScLlmdFsuTJ7C6/GWtMKWhj8O0pU6Pu'),(13,'Nicolas Galvão','123.456.789-02','(42)99966-4444','galvao2@gmail.com','$2b$10$rNwWgUx8kezhoZXXuVG7NeBXqPFAzpkc37Sg4P.ETVtiSaWWqBHxy'),
        (14,'Patrick','123.123.123-12','(42)999669966','patrick123@gmail.com','$2b$10$MZMnDj10f7JnV6ArP.5hm.TAHDZ5NwECYSw6i5kbNowwhPuqbC/W.'),(19,'Richard','148.211.069-57','(42) 99931-865','bellusci.richard@escola.pr.gov.br','$2b$10$v3aTKV7iVqrcBJozlOZwie8I7yO2CyQIfuVk4uxR2RSDPELZSeyxS'),
        (28,'Patrick','111.222.333-49','(42)99999-4444','patrick67@gmail.com','$2b$10$QRU70xwZs0JYccsQcf/BFe7IIGYaqlS0xb.TIkGsv7UKviM2A26pq'),(29,'Kauã silva de lima','152.915.999-79','(42)99999-4444','kaua.lima11@escola.pr.gov.br','$2b$10$Ax80a.N/1RUsBU48IO1hX.d4hyiNt/15aV8.8VJuPziVuzTwGe8ly'),
        (30,'Bruno','120.897.429-76','(42)99830-3607','derbli@gmail.com','$2b$10$t8fYQCnQRXxvbLczF6YJNu31UvNT1qWhZ1r9GiftnFLy1rABdFKfG'),(31,'Guilherme','111.333.444-78','(42)55555-9999','poisler456@gmail.com','$2b$10$r9QmvPFklIeeoCoHfISzGeJNnjScdYm4JZiNBmffsblVzk48uyHXa'),
        (32,'Rhuan','137.604.709-80','(42)99999-4444','rhuan@gmail.com','$2b$10$QA3mNPH90POZijUIri.hKO5pQQH223KGKyYOYycQA0GtPuKGhPrkS');
`

const ESTRUTURA_PRODUTO = `
    CREATE TABLE produto (
        id int(11) NOT NULL AUTO_INCREMENT,
        nome varchar(200) NOT NULL,
        descricao text NOT NULL,
        categoria varchar(50) NOT NULL,
        preco decimal(10,2) NOT NULL,
        caminho_img varchar(50) NOT NULL,
        quantidade_img int(11) NOT NULL,
        PRIMARY KEY (id)
    ) ENGINE=InnoDB AUTO_INCREMENT=50 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
`

const DADOS_PRODUTO = `
    INSERT INTO produto VALUES 
        (1,'Pistola Calibre .380','Pistola semiautomática calibre .380 ACP, carregador de 12 tiros, ideal para porte e defesa.','Armas Curtas',4599.90,'assets/img/pistola-380.jpg',12),
        (2,'Revólver Calibre .38','Revólver calibre .38 SPL, 6 tiros, tambor basculante, acabamento em aço inox.','Armas Curtas',3899.90,'assets/img/revolver-38.jpg',6),
        (3,'Pistola Calibre 9mm','Pistola semiautomática 9mm, carregador de 17 tiros, trilho para acessórios.','Armas Curtas',6299.90,'assets/img/pistola-9mm.jpg',5),
        (4,'Pistola Calibre .22 LR','Pistola calibre .22 LR, baixo recuo, ideal para tiro esportivo e iniciação.','Armas Curtas',2799.90,'assets/img/pistola-22.jpg',9),
        (5,'Revólver Calibre .357 Magnum','Revólver .357 Magnum, 6 tiros, cano de 4 polegadas, alta potência.','Armas Curtas',5499.90,'assets/img/revolver-357.jpg',7),
        (6,'Carabina Calibre .22','Carabina semiautomática .22 LR, cano de 20 polegadas, coronha em polímero.','Armas Longas',3499.90,'assets/img/carabina-22.jpg',8),
        (7,'Espingarda Calibre 12','Espingarda de repetição calibre 12, cano de 28 polegadas, para caça e tiro.','Armas Longas',4899.90,'assets/img/espingarda-12.jpg',4),
        (8,'Rifle de Ferrolho .308','Rifle de ferrolho calibre .308 Winchester, cano flutuante, luneta opcional.','Armas Longas',8999.90,'assets/img/rifle-308.jpg',10),
        (9,'Carabina de Pressão 5.5mm','Carabina de pressão calibre 5.5mm, mola de alta potência, coronha em madeira.','Armas de Pressão',1299.90,'assets/img/carabina-pressao.jpg',3),
        (10,'Munição .380 ACP (50 un.)','Caixa com 50 munições .380 ACP, ponta ogival, uso esportivo.','Munições',249.90,'assets/img/municao-380.jpg',4),
        (11,'Munição 9mm (50 un.)','Caixa com 50 munições 9mm Luger, ponta FMJ, uso esportivo.','Munições',299.90,'assets/img/municao-9mm.jpg',6),
        (12,'Munição .38 SPL (50 un.)','Caixa com 50 munições .38 SPL, ponta semi-ogival.','Munições',279.90,'assets/img/municao-38.jpg',10),
        (13,'Munição .22 LR (100 un.)','Caixa com 100 munições .22 LR, ideal para treino e tiro esportivo.','Munições',89.90,'assets/img/municao-22.jpg',15),
        (14,'Munição Calibre 12 (25 un.)','Caixa com 25 cartuchos calibre 12, chumbo 7, para tiro ao prato.','Munições',199.90,'assets/img/municao-12.jpg',5),
        (15,'Coldre Interno para Pistola','Coldre interno em kydex, clip para cinto, ajuste para canhotos e destros.','Acessórios',189.90,'assets/img/coldre-interno.jpg',8),
        (16,'Coldre Externo Tático','Coldre externo tático com retenção ativa e plataforma modular.','Acessórios',349.90,'assets/img/coldre-tatico.jpg',3),
        (17,'Cinto Tático Reforçado','Cinto tático em nylon reforçado, fivela metálica, ajuste rápido.','Acessórios',159.90,'assets/img/cinto-tatico.jpg',6),
        (18,'Porta-Carregador Duplo','Porta-carregador duplo em polímero, fixação em cinto, uso velado.','Acessórios',99.90,'assets/img/porta-carregador.jpg',20),
        (19,'Luneta 4x32','Luneta de aumento 4x32, retículo duplex, ideal para carabinas e rifles.','Óptica',899.90,'assets/img/luneta-4x32.jpg',7),
        (20,'Red Dot Sight','Mira holográfica red dot, retículo 2 MOA, montagem Picatinny.','Óptica',1199.90,'assets/img/red-dot.jpg',5),
        (21,'Lanterna Tática 800 lúmens','Lanterna tática de 800 lúmens, corpo em alumínio, suporte para trilho.','Óptica',299.90,'assets/img/lanterna-tatica.jpg',4),
        (22,'Mira Laser para Pistola','Mira laser compacta para pistola, montagem em trilho, ativação por pressão.','Óptica',499.90,'assets/img/mira-laser.jpg',10),
        (23,'Estojo para Arma','Estojo rígido para transporte de arma curta, com espuma recortável.','Acessórios',129.90,'assets/img/estojo-arma.jpg',8),
        (24,'Maleta para Arma Longa','Maleta rígida para carabina/rifle, com rodas e cadeado.','Acessórios',349.90,'assets/img/maleta-arma.jpg',30),
        (25,'Kit Limpeza de Armas','Kit de limpeza com escovas, varetas e óleo lubrificante.','Acessórios',89.90,'assets/img/kit-limpeza.jpg',40),
        (26,'Trava de Gatilho','Trava de gatilho em polímero, segurança para armazenamento.','Acessórios',49.90,'assets/img/trava-gatilho.jpg',18),
        (27,'Cadeado para Arma','Cadeado de cabo reforçado para segurança de armas.','Acessórios',59.90,'assets/img/cadeado-arma.jpg',25),
        (28,'Protetor Auricular Eletrônico','Protetor auricular eletrônico, amplifica sons ambientes e corta ruídos de tiro.','Equipamentos',299.90,'assets/img/protetor-auricular.jpg',14),
        (29,'Óculos de Proteção Balístico','Óculos de proteção balístico, lente antiembaçante, certificação.','Equipamentos',129.90,'assets/img/oculos-protecao.jpg',22),
        (30,'Alvo de Papel (50 un.)','Bloco com 50 alvos de papel para treino de tiro.','Acessórios',39.90,'assets/img/alvos-papel.jpg',16),
        (31,'Alvo Metálico Silhueta','Alvo metálico tipo silhueta, reforçado, para tiro esportivo.','Acessórios',199.90,'assets/img/alvo-metalico.jpg',20),
        (32,'Cronógrafo Balístico','Cronógrafo para medição de velocidade de projéteis, display digital.','Equipamentos',899.90,'assets/img/cronografo.jpg',9),
        (33,'Bolsa de Transporte Tática','Bolsa tática para transporte de equipamentos de tiro, várias divisórias.','Acessórios',249.90,'assets/img/bolsa-tatica.jpg',7),
        (34,'Bastão de Limpeza Calibre 12','Bastão de limpeza em alumínio para calibre 12, 3 partes.','Acessórios',69.90,'assets/img/bastao-limpeza.jpg',6),
        (35,'Óleo Lubrificante para Armas','Óleo lubrificante específico para armas, frasco 100ml.','Acessórios',39.90,'assets/img/oleo-arma.jpg',3),
        (36,'Pano de Microfibra (Kit 5)','Kit com 5 panos de microfibra para limpeza e polimento.','Acessórios',29.90,'assets/img/pano-microfibra.jpg',12),
        (37,'Colete Tático','Colete tático com painéis MOLLE, ajustável, sem placas balísticas.','Vestuário',399.90,'assets/img/coleto-tatico.jpg',4),
        (38,'Luvas Táticas','Luvas táticas com proteção nos dedos, aderência reforçada.','Vestuário',129.90,'assets/img/luvas-taticas.jpg',10),
        (39,'Boné Tático','Boné tático com patch removível e ajuste traseiro.','Vestuário',69.90,'assets/img/bone-tatico.jpg',6),
        (40,'Livro - Balística Básica','Livro sobre fundamentos de balística para iniciantes.','Livros',89.90,'assets/img/livro-balistica.jpg',20),
        (41,'Livro - Tiro Esportivo','Guia de tiro esportivo, técnicas e regulamentos.','Livros',79.90,'assets/img/livro-tiro.jpg',18),
        (42,'Caderno de Registro de Treino','Caderno para registro de sessões de treino e desempenho.','Papelaria',29.90,'assets/img/caderno-treino.jpg',30),
        (43,'Kit de Recarga Básico','Kit básico de recarga de munições (prensa manual e acessórios).','Recarga',1199.90,'assets/img/kit-recarga.jpg',8),
        (44,'Pólvora para Recarga (500g)','Pólvora para recarga esportiva, frasco de 500g.','Recarga',349.90,'assets/img/polvora.jpg',25),
        (45,'Prensa de Recarga Monoestação','Prensa monoestação para recarga de munições.','Recarga',899.90,'assets/img/prensa-recarga.jpg',22),
        (46,'Suporte de Parede para Arma','Suporte de parede para exposição e armazenamento de arma longa.','Acessórios',89.90,'assets/img/suporte-parede.jpg',15),
        (47,'Capa de Proteção para Luneta','Capa protetora para luneta, material emborrachado.','Acessórios',49.90,'assets/img/capa-luneta.jpg',18),
        (48,'Cabinho de Limpeza (Kit)','Kit de cabinhos de limpeza para diversos calibres.','Acessórios',59.90,'assets/img/cabinho-limpeza.jpg',20),
        (49,'Bolsa para Munição','Bolsa para transporte de munições, com divisórias e fecho.','Acessórios',149.90,'assets/img/bolsa-municao.jpg',10);
`

// Tabela de compras e itens (AV3)
const ESTRUTURA_COMPRA = `
    CREATE TABLE compra (
        id int(11) NOT NULL AUTO_INCREMENT,
        cliente_id int(11) NOT NULL,
        data_compra datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
        valor_total decimal(10,2) NOT NULL,
        status varchar(30) NOT NULL DEFAULT 'pendente',
        PRIMARY KEY (id),
        KEY fk_compra_cliente (cliente_id),
        CONSTRAINT fk_compra_cliente FOREIGN KEY (cliente_id) REFERENCES cliente (id)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

    CREATE TABLE item_compra (
        id int(11) NOT NULL AUTO_INCREMENT,
        compra_id int(11) NOT NULL,
        produto_id int(11) NOT NULL,
        quantidade int(11) NOT NULL,
        preco_unitario decimal(10,2) NOT NULL,
        subtotal decimal(10,2) NOT NULL,
        PRIMARY KEY (id),
        KEY fk_item_compra (compra_id),
        KEY fk_item_produto (produto_id),
        CONSTRAINT fk_item_compra FOREIGN KEY (compra_id) REFERENCES compra (id) ON DELETE CASCADE,
        CONSTRAINT fk_item_produto FOREIGN KEY (produto_id) REFERENCES produto (id)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
`

async function criar_tabelas() {
    const connection = await db.pool.getConnection();
    try {
        await connection.beginTransaction();

        console.log("Criando tabela 'cliente'...");
        await connection.query(ESTRUTURA_CLIENTE);
        await connection.query(DADOS_CLIENTE);

        console.log("Criando tabela 'produto'...");
        await connection.query(ESTRUTURA_PRODUTO);
        await connection.query(DADOS_PRODUTO);

        console.log("Criando tabelas 'compra' e 'item_compra'...");
        await connection.query(ESTRUTURA_COMPRA);

        await connection.commit();
        console.log("Migration executada com sucesso!");
        process.exit(0);
    } catch (error) {
        await connection.rollback();
        console.log(error)
        process.exit(1);
    } finally {
        connection.release();
    }
}
criar_tabelas()
