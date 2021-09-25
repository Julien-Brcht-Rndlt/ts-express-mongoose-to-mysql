CREATE DATABASE IF NOT EXISTS `wilders`;

CREATE TABLE IF NOT EXISTS `wilders`.`wilder` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `wilderName` VARCHAR(30) NOT NULL,
  `city` VARCHAR(150) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS `wilders`.`skill` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(100) NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS `wilders`.`wilder_skill` (
  `id_wilder` INT NOT NULL,
  `id_skill` INT NOT NULL,
  `votes` INT NULL,
  PRIMARY KEY (`id_wilder`, `id_skill`),
  INDEX `id_skill_idx` (`id_skill` ASC) VISIBLE,
  CONSTRAINT `id_wilder`
    FOREIGN KEY (`id_wilder`)
    REFERENCES `wilders`.`wilder` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `id_skill`
    FOREIGN KEY (`id_skill`)
    REFERENCES `wilders`.`skill` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB