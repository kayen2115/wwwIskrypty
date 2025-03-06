Zaloguj się do swojego serwera zgodnie z danymi otrzymanymi od prowadzącego, używając jednej ze swoich domen:
ssh root@srv08.lab2137.pl
Hasło to: PleaseChangePassNow890
Jeśli pojawi się komunikat "The authenticity of host...", wpisz "yes".
Zmień hasło dla użytkownika root i zapamiętaj nowe hasło:
passwd
Podczas wpisywania hasło nie będzie widoczne ze względów bezpieczeństwa. Mimo tego jest ono wpisywane.
Wiele dystrybucji opartych na systemie Red Hat (w tym Rocky Linux) może mieć włączony w systemie SELinux. Jest to dodatkowa warstwa zabezpieczeń systemu, która może wymagać zaawansowanej konfiguracji, aby wszystkie usługi działały w prawidłowy sposób. Sprawdź czy SELinux jest włączony:
getenforce
Jeżeli polecenie nie zwróciło napisu "Enforcing" to możesz przejść do kolejnego punktu (SELinux jest wyłączony). Jeżeli jest napisane "Enforcing", wykonaj poniższe polecenie:
setenforce 0
a następnie edytuj plik /etc/sysconfig/selinux i zmień SELINUX=enforcing na SELINUX=disabled - dzięki temu SELinux pozostanie wyłączony po restarcie systemu.
Zainstaluj i uruchom serwer httpd (znany również jako apache), który służy do serwowania stron www:
yum install httpd
systemctl enable httpd
systemctl start httpd
Yum to menedżer pakietów, który jest używany głównie w systemach operacyjnych opartych na jądrze Linux. Pozwala on na instalowanie, aktualizowanie oraz usuwanie pakietów z systemu oraz zarządzanie ich zależnościami.

Systemctl to narzędzie służące do zarządzania usługami w systemach operacyjnych opartych na jądrze Linux. Umożliwia ono uruchamianie, zatrzymywanie, restartowanie oraz wyświetlanie statusu usług. Polecenie 'systemctl enable' służy do włączenia usługi lub jednostki podczas startu systemu. Oznacza to, że usługa lub jednostka zostanie automatycznie uruchomiona po każdym restarcie systemu. Natomiast polecenie 'systemctl start' służy do ręcznego uruchomienia usługi lub jednostki w bieżącej sesji systemu.
Otwórz w przeglądarce adres: http://srv08.lab2137.pl. Pomimo, że serwer httpd działa i serwuje strony, systemowy firewall blokuje domyślnie połączenia z zewnątrz, dlatego strona nie wczytuje się. Możesz upewnić się, że serwer działa wykonując polecenie:
curl -L http://localhost
Curl jest to narzędzie wiersza poleceń, które pozwala na wysyłanie żądań HTTP i HTTPS. Dzięki curl można uzyskać informacje o nagłówkach HTTP, treści stron internetowych oraz pobierać i wysyłać pliki. Curl jest bardzo użyteczny, ponieważ pozwala na testowanie i debugowanie aplikacji internetowych, a także na automatyzację pewnych czynności, takich jak pobieranie i przetwarzanie danych z serwerów.

Powyższe polecenie wczytuje stronę z bieżącego serwera (localhost w systemach linux to adres wskazujący na bieżący serwer). Zostanie zwrócony kod HTML domyślnej strony serwera.
Katalog z którego serwer wczytuje domyślną stronę to /var/www/html. Obejrzyj główny plik konfiguracyjny /etc/httpd/conf/httpd.conf. Znajduje się tam dyrektywa DocumentRoot, która określa katalog dla domyślnej strony. Poszukując pliku, który ma zostać wczytany, domyślnie serwer httpd szuka pliku index.html. Wejdź do katalogu /var/www/html i zobacz co jest w środku - jest pusty. W takim przypadku serwer wczytuje stronę z jednego z plików znajdujących się w katalogu /usr/share/httpd/noindex. Wystarczy więc wgrać dowolny plik o nazwie index.html do katalogu /var/www/html, aby serwer zaczął go serwować:
touch /var/www/html/index.html
vi /var/www/html/index.html                   (lub: nano /var/www/html/index.html)
Teraz po wykonaniu wcześniej podanego polecenia curl, powinna pojawić się treść, która została przez Ciebie wpisana do nowego pliku index.html.
Należałoby teraz udostępnić naszą stronę dla świata zewnętrznego. Sprawdź jakie reguły wykorzystuje obecnie firewall:
firewall-cmd --list-all
Firewall-cmd jest rozbudowanym narzędziem do tekstowego zarządzania firewallem w systemach z rodziny Red Hat. Powyższe polecenie wypisuje aktualną konfigurację firewalla:

        public (active)
          target: default
          icmp-block-inversion: no
          interfaces: eth0
          sources:
          services: dhcpv6-client ssh
          ports:
          protocols:
          forward: yes
          masquerade: no
          forward-ports:
          source-ports:
          icmp-blocks:
          rich rules:
        
Widać, że firewall obecnie korzysta ze strefy public. W tej strefie serwer blokuje domyślnie wszystkie nowe połączenia z zewnątrz dopóki nie ustawimy reguł zezwalających na określony dostęp. Widać, że w sekcji services firewall dopuszcza kilka usług, w tym ssh, dzięki czemu mogliśmy zalogowac się do serwera. Zezwól na dostęp do usług http i https (porty 80 i 443):
firewall-cmd --permanent --add-service http
firewall-cmd --permanent --add-service https
firewall-cmd --reload
Teraz otwierając stronę http://srv08.lab2137.pl powinien być widoczny wpisany przez Ciebie wcześniej tekst.
Zauważ, że bez względu na to czy wejdziesz na stronę http://srv08.lab2137.pl, http://web08.lab2137.pl, czy też pod adres http://ip_serwera, zawsze uruchamia się domyślna strona z katalogu /var/www/html. Podane domeny wskazują na IP serwera, ale httpd nie umie ich jeszcze rozróżniać. Aby serwer zaczął rozróżniać o jaką stronę nam chodzi musimy skonfigurować tak zwane virtual hosty (vhosty).
Protip: W Rocky Linux pliki vhostów można wgrać bezpośrednio do katalogu /etc/httpd/conf.d, ale warto wiedzieć, iż wiele dystrybucji (np. opartych na Debianie) posiada przeznaczone do tego katalogi /etc/apache2/sites-available oraz /etc/apache2/sites-enabled.
Stwórz plik /etc/httpd/conf.d/srv08.conf i wklej do niego poniższą treść:
            <VirtualHost *:80>
                ServerName srv08.lab2137.pl
                DocumentRoot "/home/srv08"
            </VirtualHost>

            <Directory /home/srv08>
                Require all granted
            </Directory>
        
Dyrektywa VirtualHost definiuje nową "stronę" obsługiwaną przez serwer, w minimalnej konfiguracji wskazuje się w niej IP, port, nazwę domeny oraz katalog ze stroną.
Protip: Więcej o konfiguracji vhostów możesz przeczytać na stronie https://httpd.apache.org/docs/2.4/vhosts/examples.html
W dyrektywnie Directory ustawia się opcje dla konkretnego katalogu, w tym przypadku katalogu naszej strony zdefiniowanej w vhoście. Domyślnie w nowych wersjach httpd dostęp do każdego katalogu jest autoryzowany i musimy go aktywować dla wszystkich gości dyrektywą Require all granted.
Protip: Więcej o dyrektywach dostępu możesz przeczytać na stronie https://httpd.apache.org/docs/2.4/howto/access.html
Zgodnie z ustawioną konfiguracją należy stworzyć katalog /home/srv08, a w nim index.html. Jeżeli odwiedzający naszą stronę internetową nie poda nazwy pliku w adresie strony, serwer httpd wczytuje domyślnie plik index.html, dlatego właśnie go tworzymy. Następnie należy zrestartować serwer httpd:
mkdir /home/srv08
echo "Ala ma kota" > /home/srv08/index.html
systemctl restart httpd
Otwórz w przeglądarce stronę http://srv08.lab2137.pl. Jeżeli poprawnie skonfigurowano vhosta, powinien być widoczny tekst "Ala ma kota".
W sposób podobny jak w poprzednim punkcie, stwórz plik konfiguracyjny dla domeny web08.lab2137.pl, utwórz katalog dla jej strony oraz plik index.html zawierający tekst "Kot Ali to Mruczek". Przetestuj czy po restarcie httpd obie strony wczytują się i pokazują właściwe dla siebie treści.
Stworzone strony działają tylko i wyłącznie wykorzystując nieszyfrowany protokół http (bez "s" na końcu). W dzisiejszych czasach korzystanie z tego rodzaju stron powoduje ostrzeżenia ze strony przeglądarek i naraża na kradzież danych klientów, ponieważ podczas logowania w serwisach ich dane są transportowane przez Internet plain-textem (w czystej postaci, bez szyfrowania). Skonfigurujemy teraz nasze strony, aby obsługiwały protokół https. W tym celu ręcznie wygenerujemy certyfikaty SSL, dzięki którym przeglądarki będą mogły nawiązać szyfrowane połączenie z naszymi stronami. Pierwszym krokiem jest instalacja modułu SSL dla httpd:
yum install mod_ssl
Teraz możemy wygenerować certyfikat dla domeny srv08.lab2137.pl:
openssl req -newkey rsa:4096 -nodes -keyout /etc/pki/tls/private/srv08.key -x509 -days 365 -out /etc/pki/tls/certs/srv08.crt
Po wykonaniu powyższe polecenie poprosi użytkownika o podanie kilku danych, na większość z pól można nie odpowiadać naciskając enter, należy jednak podać Common Name wprowadzając nazwę domeny (srv08.lab2137.pl).
Opcje podane do narzędzia openssl mają następujące znaczenie:
req - tryb służący między innymi do tworzenia certyfikatów podpisanych przez samego siebie,
-newkey rsa:4096 - klucz typu RSA (4096 bitów),
-nodes - klucz prywatny nie będzie szyfrowany,
-keyout - gdzie zapisać klucz prywatny,
-x509 - tworzenie certyfikatu podpisanego przez samego siebie, zamiast CSR (żądania podpisania certyfikatu),
-days 365 - przez ile dni ma być ważny certyfikat,
-out - gdzie zapisać certyfikat (klucz publiczny).
W związku z tym, że protokół https jest obsługiwany na innym porcie (443), należy utworzyć vhosta, dopisując na końcu utworzonego wcześniej pliku /etc/httpd/conf.d/srv08.conf poniższy blok:
        <VirtualHost *:443>
            ServerName srv08.lab2137.pl
            DocumentRoot "/home/srv08"
            SSLEngine on
            SSLCertificateFile /etc/pki/tls/certs/srv08.crt
            SSLCertificateKeyFile /etc/pki/tls/private/srv08.key
            <FilesMatch "\.(cgi|shtml|phtml|php)$">
                SSLOptions +StdEnvVars
            </FilesMatch>
        </VirtualHost>
        
Za pomocą dyrektyw rozpoczynających się ciągiem "SSL" aktywujemy szyfrowanie i ustawiamy klucz prywatny i publiczny dla transmisji. Blok FilesMatch powoduje, że dla plików zawierających skrypty, httpd będzie tworzyć przed uruchomieniem podstawowe zmienne środowiskowe powiązane z modułem SSL - będzie to przydatne później kiedy uruchomimy obsługę skryptów.

Teraz możesz zrestartować httpd i sprawdzić czy na stronie https://srv08.lab2137.pl serwowana jest treść z katalogu /home/srv08.
Warto wiedzieć: Przeglądarka może zgłosić, że połączenie jest niezabezpieczone we właściwy sposób. Zignoruj komunikat dodając wyjątek. Certyfikaty samopodpisane nie są rozpoznawane przez przeglądarki, dlatego powodują ostrzeżenia, ale nie oznacza to wcale, że samo szyfrowanie musi być mniej skuteczne.

Podpisany certyfikat SSL to certyfikat, który został podpisany przez zaufaną trzecią stronę, zwanej Autorytetem Certyfikacji (CA). CA jest organizacją, która udziela autoryzacji certyfikatom SSL, po weryfikacji tożsamości właściciela strony internetowej. Podpisany certyfikat SSL zapewnia potwierdzenie tożsamości właściciela strony internetowej i pozwala na szyfrowanie komunikacji między przeglądarką użytkownika a serwerem.

Z drugiej strony, samopodpisany certyfikat SSL jest certyfikatem wydanym bezpośrednio przez właściciela strony internetowej, bez weryfikacji przez zaufaną trzecią stronę. Samopodpisany certyfikat SSL może być stosowany, aby zapewnić szyfrowanie komunikacji między przeglądarką użytkownika a serwerem, ale nie potwierdza tożsamości właściciela strony internetowej na takim samym poziomie, jak podpisany certyfikat SSL.
W sposób podobny jak w poprzednich dwóch punktach, stwórz konfigurację SSL vhosta dla domeny web08.lab2137.pl. Przetestuj czy po restarcie httpd obie strony wczytują się z prefixem https:// i pokazują właściwe dla siebie treści.
Ostatnim zadaniem jest dodanie obsługi skryptów PHP i python. Stwórz plik /home/srv08/test.php i umieść w nim następujący kod skryptu PHP:
<?php
    print "Hello World PHP!";
?>
            
Następnie utwórz kolejny plik /home/python/test.py (katalog /home/python należy utworzyć). Plik skryptu celowo nie znajduje się w katalogu strony, aby nie było do niego bezpośredniego dostępu. Umieść w nim następujący kod skryptu pythona:
def application(environ, start_response):
    status = '200 OK'
    output = b'Hello World python!'

    response_headers = [('Content-type', 'text/plain'),
                        ('Content-Length', str(len(output)))]
    start_response(status, response_headers)

    return [output]
        
Przejdź pod adres skryptu PHP:
http://srv08.lab2137.pl/test.php
Zauważ, że bez obsługi skryptów PHP i python, httpd serwuje "dosłownie" treść skryptu, bez uruchomienia kodu w nim zawartego. Zajrzyj w przeglądarce w źródło strony, aby to dostrzec.
Doinstaluj brakujące moduły do httpd:
yum install php python3-mod_wsgi
Dla PHP taka instalacja jest wystarczająca, ale musimy jeszcze powiedzieć serwerowi pod jaką ścieżką będzie serwowany skrypt python, ponieważ znajduje się on w innym katalogu, niedostępnym dla przeglądarki internetowej. W pliku /etc/httpd/conf.d/srv08.conf wewnątrz obu bloków VirtualHost dopisz linię:
    WSGIScriptAlias /testpython /home/python/test.py
            
Dodatkowo na samym dole pliku dodaj dyrektywę zezwalającą na dostęp do katalogu /home/python:
<Directory /home/python>
    Require all granted
</Directory>
            
Zrestartuj serwer httpd i przejdź pod adresy:
http://srv08.lab2137.pl/test.php
http://srv08.lab2137.pl/testpython
Skrypty powinny działać i generować treści: "Hello World PHP!" oraz "Hello World python!".
