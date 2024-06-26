# Tutorial de ramas en Git

## Pasos iniciales
Antes de empezar a trabajar con ramas, es necesario configurar algunas variables de Git para que se puedan rastrear los cambios. El rastreo de los cambios son necesarios para que git sepa en todo el momento quién hace cambios en el proyecto, y poder hacer el registro.

Para ello, ejecutamos los siguientes comandos:

```bash
  git config --global user.email "Nombre Usuario"
  git config --global user.name "CorreoUsuario@hotmal.com"
```

## Comando para ver la lista de ramas disponibles
Para ver todas las ramas, tanto locales como remotas, usamos el comando git branch -a:

```bash
  git branch -a
```

## Crear una nueva rama
*Se crea una rama de forma local.*
Las ramas se crean a partir de la rama principal, que se denomina `master` que es la rama de producción. Para crear una nueva rama y luego cambiarse a ella, usamos los siguientes comandos:

```bash
  git branch NombreRama
  git checkout NombreRama
```

o se puede crear una rama y directamente cambiarse a ella de la siguiente manera:


```bash
  git checkout -b SantiagoRomero
```

## Sincronizar las rama con las que queremos trabajar
Para sincronizar una rama remota con la rama local que acabamos de crear y solo tenemos nosotros en nuestro PC, usamos el comando:

```bash
  git push --set-upstream origin NombreRama
```
*Este comando crea un enlace entre la rama local NombreRama y la rama remota NombreRama del repositorio remoto.*

Si queremos sincronizar una rama que este de forma remota, queremos traer esa rama de forma local y trabajar con ella usamos el siguiente comando:

```bash
  git pull --set-upstream origin NombreRama
```

## Moverme entre ramas
Para movernos entre ramas y trabajar desde una rama en especifica podemos usar el comando:

```bash
  git checkout NombreRama
```

## Actualizar avances con la rama de producción, master

Para actualizar cambios o novedades de mis avances, podemos hacer esto:

```bash
  git checkout master
  git merge NombreDeMiRama
```

*Combinamos las ramas para que las novedades se agregen a la ramas principal de producción. Dado el caso que hayan conflictos git nos avisará y hay que solucionarlo de forma manual*

Si queremos actualizar un archivo en especifico y no todos los cambios tendremos que hacer lo siguiente:

```bash
  git checkout main
  git merge-file NombreDeMiRama/NombreArchivo.html main
```

*Acá estamos agregando el archivo* `NombreArchivo.html` *a main para solamente agregar ese nuevo archivo a main*

## Observación

Para mezclar cambios, agregar archivos a una rama en especifico tenemos que estar parados en esa rama, si estamos en main, todos los cambios surgiran cambios ahí mismo.

## Adiciones

git push origin main 
git branch --track main origin/main
git branch --set-upstream-to origin/main main
git config --global push.default current  # Empujar a la rama con el mismo nombre
git config --global push.default upstream  # Empujar a la rama upstream
git config --global branch.autoSetupMerge simple
git branch -vv

git fetch para obtener los cambios remotos
git merge origin/main para fusionar los cambios remotos en tu rama local