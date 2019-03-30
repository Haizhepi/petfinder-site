package petfinder.site.endpoint;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import petfinder.site.common.Notification.NotificationDto;
import petfinder.site.common.Notification.NotificationService;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/notification")
public class NotificationEndpoint {
    @Autowired
    private NotificationService notificationService;
    @GetMapping(value = "/{id}", produces = "application/json")
    public Optional<NotificationDto> getOpenBooking(@PathVariable("id") String id) {

        return notificationService.findNotification(id);
    }

}
