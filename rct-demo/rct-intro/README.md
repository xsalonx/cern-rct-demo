# 1. Wstęp

Na potrzeby tutoriala utworzymy bazę danych, z którą będzie komunikować się nasza aplikacja. Do zarządzania bazą danych wykorzystujemy [PostgreSQL](https://www.postgresql.org/). Nie przedstawiamy procesu instalacji i lokalnej konfiguracji, ponieważ dla różnych systemów operacyjnych wyglądają one inaczej.

W folderze [postgres](https://github.com/xsalonx/cern_RCT_test/tree/master/postgres) znajdują się skrypty sql, z których korzystamy w kolejnych krokach. Zakładamy wykorzystanie klienta `psql`, który zapewnia interfejs konsolowy. Ponadto warto zapoznać się z narzędziem upraszczającym administrację bazą danych, [pgAdmin](https://www.pgadmin.org).

# 2. Baza danych
_Disclaimer:_ Przyjęty schemat bazy danych (rysunek poniżej) został stworzony na podstawie dokumentów dostępnych w momencie pisania tego pliku. Ze względu na napotkane niejednoznaczności lub/i błędy interpretacyjne najprawdopodobniej nie odzwierciedla on rzeczywistych zależności pomiędzy danymi.

![diagram](https://user-images.githubusercontent.com/48785655/127494257-59081600-07c4-4277-bee6-3acd5ceba941.png)

# 3. Wybierz jedną ze ścieżek:

| Wersja dla lubiących pisać / chcących poćwiczyć lub nauczyć się Postgresa | 4. |
|----------| ------------- |
| Wersja dla leniwych | 5. |
| Wersja dla bardzo leniwych | 6. |

# 4. Polecenia wpisywane ręcznie (:point_up: nie musisz niczego pobierać)
```shell
```

# 5. Polecenia uruchamiane za pomocą `\i`
## 5.1. Utworzenie użytkownika i bazy danych
```shell
cd postgres
psql
\i create-user.sql # tworzy nowego użytkownika z hasłem, oczywiście można równoważnie wpisać do konsoli zawartość skryptu
\du # wyświetl listę użytkowników, powinien pojawić się nowy użytkownik; żeby wyjść: q
\i create-database.sql # tworzy bazę danych
\l # wyświetl listę baz danych, powinna się tam pojawić nowoutworzona baza danych
\i alter-database.sql # zmiana właściciela bazy danych na "rct-user"
\l
exit
```

Praca użytkownika z bazą danych:
```shell
psql -d "rct-db" -U "rct-user" -W
```
Po wprowadzeniu hasła (`rct-passwd`) można sprawdzić parametry połączenia za pomocą polecenia `\conninfo`.

W przypadku błędu `psql: error: FATAL:  Peer authentication failed for user "rct-user"`, warto sprawdzić i ewentualnie zmodyfikować zawartość pliku `pg_hba.conf` (Ubuntu: `sudo nano /etc/postgresql/13/main/pg_hba.conf`). Jeżeli metoda autentykacji ustawiona jest na `peer`, to postgres będzie używał nazwy konta systemu operacyjnego jako nazwy bazy danych i nazwy użytkownika. Problem może rozwiązać zmiana linijki:
```
# TYPE DATABASE USER ADDRESS METHOD
local  all      all          peer
```
na:
```
# TYPE DATABASE USER ADDRESS METHOD
local  all      all          md5
```
czyli metodę autentykacji opartej o hasło.

Następnie należy zrestartować postgresa: `sudo service postgresql restart`.

## 5.2. Tabele
```shell
psql -d "rct-db" -U "rct-user" -W
# utworzenie tabel:
\i periods.sql
\i mc.sql
\i runs.sql
\i flags.sql
\i b-fields.sql
\dt # wyświetl wszystkie tabele
select * from mc; # wyświetl wszystkie dane z tabeli mc

# uzupełnienie tabel:
\i fill-periods.sql
\i fill-runs.sql
\i fill-flags.sql
\i fill-mc.sql
\i fill-b-fields.sql
```

# 6. [pythonDBman](https://github.com/xsalonx/cern_RCT_test/tree/master/pythonDBman)
Automatyczne generowanie większej liczby przykładowych rekordów przy pomocy skryptów napisanych w języku Python.