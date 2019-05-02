package petfinder.site.common.user.sitter;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import petfinder.site.common.booking.BookingDao;
import petfinder.site.common.booking.BookingDto;
import petfinder.site.common.booking.BookingService;
import petfinder.site.common.user.UserAuthenticationDto;
import petfinder.site.common.user.UserDao;
import petfinder.site.common.user.UserDto;
import sun.security.pkcs.ParsingException;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class SitterService {
    @Autowired
    private SitterAvailabilityDao sitterAvailabilityDao;

    @Autowired
    private UserDao userDao;

    @Autowired
    private BookingService bookingService;

    public List<SitterInfo> getAllSitters() {
        List<SitterInfo> res = new ArrayList<>();
        List<SitterAvailabilityDto> avail = sitterAvailabilityDao.findAllAvailability();
        for (SitterAvailabilityDto a : avail) {
            UserDto userDto = userDao.findUserByPrincipal(a.getPrincipal()).get().getUser();
            res.add(new SitterInfo(userDto, a));
        }
        return res;
    }

    public List<SitterAndDate> getSitters(String bookingId) {
        BookingDto booking = bookingService.findBooking(bookingId).get();
        List<SitterAndDate> res = new ArrayList<>();
        List<SitterAvailabilityDto> avails = sitterAvailabilityDao.findAllAvailability();
        System.out.println("list size" + avails.size());

        for (SitterAvailabilityDto sitterAvailabilityDto : avails) {
            if (sitterAvailabilityDto.getStartDate() != null
                    && sitterAvailabilityDto.getEndDate() != null
                    && sitterAvailabilityDto.getStartTime() != null
                    && sitterAvailabilityDto.getEndTime() != null
                    && booking.getStartDate() != null
                    && booking.getEndDate() != null
                    && booking.getStartTime() != null
                    && booking.getEndTime() != null) {
                if (bookingService.evaluate(booking.getStartDate(), booking.getEndDate(),
                        sitterAvailabilityDto.getStartDate(), sitterAvailabilityDto.getEndDate(),
                        booking.getStartTime(), booking.getEndTime(),
                        sitterAvailabilityDto.getStartTime(), sitterAvailabilityDto.getEndTime()
                ) == 1) {
                    System.out.println("valid");
                    UserDto sitter = userDao.findUserByPrincipal(sitterAvailabilityDto.getPrincipal()).get().getUser();
                    double dis = calculateDistance(booking.getLat(), sitterAvailabilityDto.getLat(),
                            booking.getLng(), sitterAvailabilityDto.getLng());
                    res.add(new SitterAndDate(sitterAvailabilityDto, sitter, dis));
                }
            }

        }
        return res;
    }

    public double calculateDistance(double lat1, double lat2, double lon1,
                                  double lon2) {
        final int R = 6371; // Radius of the earth
        double latDistance = Math.toRadians(lat2 - lat1);
        double lonDistance = Math.toRadians(lon2 - lon1);
        double a = Math.sin(latDistance / 2) * Math.sin(latDistance / 2)
                + Math.cos(Math.toRadians(lat1)) * Math.cos(Math.toRadians(lat2))
                * Math.sin(lonDistance / 2) * Math.sin(lonDistance / 2);
        double c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        double distance = R * c * 1000; // convert to meters


        distance = Math.pow(distance, 2);

        return Math.sqrt(distance);
    }

    public List<BookingDto> sitterBookings(String principal) {
        return bookingService.sitterBookings(principal);
    }

    public SitterAvailabilityDto findAvailability(String id) {
        System.out.println("here"+id);
        Optional<SitterAvailabilityDto> temp = sitterAvailabilityDao.findAvailability(id);
        if (!temp.isPresent()) {
            return null;
        }
        return processDate(temp.get());
    }

    public SitterAvailabilityDto processDate(SitterAvailabilityDto sitterAvailabilityDto) {
        SitterAvailabilityDto st = new SitterAvailabilityDto(sitterAvailabilityDto);
        st.setStartDate(st.getStartDate().substring(0, 10));
        st.setEndDate(st.getEndDate().substring(0, 10));
        st.setStartTime(st.getStartTime().substring(11, 19));
        st.setEndTime(st.getEndTime().substring(11, 19));
        return st;
    }

    public UserDto findUserInfo(String principle) {
        UserDto res = new UserDto("Empty user");
        Optional<UserAuthenticationDto> temp = userDao.findUserByPrincipal(principle);
        if (temp.isPresent()) {
            res = temp.get().getUser();
        }
        return res;
    }


    public SitterAvailabilityDto save(SitterAvailabilityDto sitterAvailabilityDto) {
        sitterAvailabilityDao.save(sitterAvailabilityDto);
        return sitterAvailabilityDto;
    }

    public SitterAvailabilityDto update(SitterAvailabilityDto sitterAvailabilityDto) {
        SitterAvailabilityDto temp = null;
        Optional<SitterAvailabilityDto> u = sitterAvailabilityDao.findAvailability(sitterAvailabilityDto.getPrincipal());
        if (u.isPresent()) {
            temp = u.get();
            temp.setAvailability(sitterAvailabilityDto.getAvailability());
            temp.setStartDate(sitterAvailabilityDto.getStartDate());
            temp.setEndDate(sitterAvailabilityDto.getEndDate());
            temp.setStartTime(sitterAvailabilityDto.getStartTime());
            temp.setEndTime(sitterAvailabilityDto.getEndTime());
            temp.setLat(sitterAvailabilityDto.getLat());
            temp.setLng(sitterAvailabilityDto.getLng());
            temp.setLocationName(sitterAvailabilityDto.getLocationName());
            sitterAvailabilityDao.save(temp);
        }
        else {
            sitterAvailabilityDao.save(sitterAvailabilityDto);
        }
        return temp;
    }

    public List<BookingDto> getInvitations(String userId) {
        Optional<SitterAvailabilityDto> temp1 = sitterAvailabilityDao.findAvailabilityByUserID(new UserDto(userId));
        if (!temp1.isPresent()) {
            return null;
        }
        SitterAvailabilityDto temp = temp1.get();
        List<BookingDto> res = new ArrayList<>();
        if (temp.getInvitations() != null) {
            for (String id : temp.getInvitations()) {
                res.add(bookingService.findBooking(id).get());
            }
        }
        System.out.println("find bookings: " + res.size());
        return res;
    }

}
