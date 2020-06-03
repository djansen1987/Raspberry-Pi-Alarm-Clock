# Install Raspbian:
https://www.raspberrypi.org/downloads/raspbian/

# Enable SSH:
Enter sudo raspi-config in a terminal window.
Select Interfacing Options.
Navigate to and select SSH.
Choose Yes.
Select Ok.
Choose Finish

# Remove lighting bolt and Rotate screen:
sudo nano /boot/config.txt

#/ Enable audio (loads snd_bcm2835)
dtparam=audio=on

[pi4]
#/ Enable DRM VC4 V3D driver on top of the dispmanx display stack
dtoverlay=vc4-fkms-v3d
max_framebuffers=2

[all]
#/dtoverlay=vc4-fkms-v3d

#/ Disable under-voltage warning
avoid_warnings=1
consoleblank=0

dtoverlay=pi3-act-led
dtparam=act-led-trigger="none"
#/ Disable the ACT LED.
dtparam=act_led_trigger=none
dtparam=act_led_activelow=off

#/ Disable the PWR LED.
dtparam=pwr_led_trigger=none
dtparam=pwr_led_activelow=off

#/display_rotate=2
lcd_rotate=2

# Make brightness controle avalible for pi:
sudo chown pi:pi /sys/class/backlight/rpi_backlight/brightness

# Install Node-Red:
sudo apt-get install nodered (installed on raspbian-buster-full)

sudo systemctl enable nodered.service
sudo systemctl start nodered.service

# Install firewall:
sudo apt-get install ufw
sudo ufw allow 22
sudo ufw allow 80
sudo ufw allow 1880
sudo ufw enable

# Iinstall unclutter to remove mouse:
sudo apt-get install unclutter

# Install mp3 player command line:
sudo apt-get install mpg123

# Modify startup:
sudo mkdir -p  ~/.config/lxsession/LXDE-pi
sudo nano ~/.config/lxsession/LXDE-pi/autostart

@lxpanel --profile LXDE-pi
pcmanfm --desktop --profile LXDE-pi
#/@xscreensaver -no-splash
point-rpi
@chromium-browser --autoplay-policy=no-user-gesture-required --start-fullscreen --start-maximized --check-for-update-interval=1 --simulate-critical-update http://192.168.13.111/alarm/web
#/@chromium-browser --autoplay-policy=no-user-gesture-required http://192.168.13.111/alarm/web

#/@unclutter -idle 0

#/Power LED off
@sudo sh -c 'echo 0 > /sys/class/leds/led1/brightness'
@sudo sh -c 'echo none > /sys/class/leds/led1/trigger'
#/Activity LED off
@sudo sh -c 'echo 0 > /sys/class/leds/led0/brightness'
@echo 0 | sudo tee /sys/class/leds/led1/brightness

# Reboot to apply changes:
sudo reboot

# Install webserver:
sudo apt install apache2 -y
sudo apt install php libapache2-mod-php -y
sudo chown -R pi:pi www/
cd /var/www/html
sudo rm index.html
git clone https://github.com/djansen1987/Raspberry-Pi-Alarm-Clock

# Install raspotify
sudo apt update
sudo apt upgrade
sudo apt install -y apt-transport-https curl
curl -sSL https://dtcooper.github.io/raspotify/key.asc | sudo apt-key add -v -
echo 'deb https://dtcooper.github.io/raspotify raspotify main' | sudo tee etc/apt/sources.list.d/raspotify.list

sudo apt update
sudo apt install raspotify
sudo nano /etc/default/raspotify
DEVICE_NAME="Wekker"
BITRATE="320"
OPTIONS="--username name@domain.tld --password abc12345678"

sudo ufw app update raspotify
sudo ufw app info raspotify
sudo ufw allow raspotify

sudo systemctl restart raspotify
