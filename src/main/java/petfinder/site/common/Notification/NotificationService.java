package petfinder.site.common.Notification;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import petfinder.site.common.booking.BookingDto;

import java.util.Optional;

@Service
public class NotificationService {
    @Autowired
    private NotificationDao notificationDao;
    public Optional<NotificationDto> findNotification(String id) {
        return notificationDao.findNotification(id);
    }

    public NotificationDto save(NotificationDto notification) {
        notificationDao.save(notification);
        return notification;
    }


}
